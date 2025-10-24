/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';
import { Pod, PodFile } from './typePod';
import {
  formatDateStart,
  formatDateEnd,
  DateRangeLocal,
} from '@/app/(dashboard)/components/DateRange';

export function usePods() {
  const [loadingPods, setLoadingPods] = useState(false);
  const [podsList, setPodsList] = useState<any[]>([]);
  const [dateFilter, setDateFilter] = useState<DateRangeLocal | undefined>(
    undefined
  );
  const [driverFilter, setDriverFilter] = useState<string | null>(null);
  const [selectedPod, setSelectedPod] = useState<Pod | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [podFiles, setPodFiles] = useState<PodFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const podsPerPage = 10;
  const authorizedRequest = useAuthorizedRequest();
  const { user } = useProfile();
  const [driverTrips, setDriverTrips] = useState<any[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const driverID = user?.user_id ?? '';

  // Form state for new POD
  const [formData, setFormData] = useState({
    id: '',
    driver_id: driverID,
    tripId: '',
    signature: '',
    notes: '',
    deliveredTo: '',
    files: [] as File[] | null,
  });

  const fetchDriverTrips = async () => {
    if (!driverID) return;

    try {
      setLoadingTrips(true);
      await authorizedRequest(async (token) => {
        const res = await api.get(`/drivers/driver/${driverID}/trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDriverTrips(res.data.assigned_trips);
      }, 'Failed to fetch driver trips');
    } catch (error) {
      console.error('Error fetching driver trips:', error);
      toast.error('Failed to fetch driver trips');
    } finally {
      setLoadingTrips(false);
    }
  };

  // Call once on mount (if driverId exists)
  useEffect(() => {
    fetchDriverTrips();
  }, [driverID]);

  const handleCreatePod = async () => {
    if (!formData.tripId) {
      toast.error('Trip ID is required');
      return;
    }
    if (!formData.deliveredTo) {
      toast.error('Delivered To is required');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        const formDataToSend = new FormData();
        formDataToSend.append('trip_id', formData.tripId);
        formDataToSend.append('delivered_to', formData.deliveredTo);
        formDataToSend.append('notes', formData.notes || '');
        formDataToSend.append('signature', formData.signature || '');

        if (formData.files && formData.files.length > 0) {
          formData.files.forEach((file) => {
            formDataToSend.append('files', file); // 👈 use plural key if your backend expects that
          });
        }

        // Reset form
        setFormData({
          id: '',
          driver_id: '',
          tripId: '',
          signature: '',
          notes: '',
          deliveredTo: '',
          files: [],
        });

        const res = await api.post('/pods/pods/upload', formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setIsCreateModalOpen(false);

        const newPod = res.data;
        setPodsList((prev) => [newPod, ...prev]);

        toast.success('POD created successfully ✅');
      }, 'Failed to create POD');
    } catch (error: any) {
      console.error('Error creating POD:', error);
      toast.error('Failed to create POD');
    }

    await fetchPods();
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const fetchPods = async () => {
    try {
      setLoadingPods(true);

      await authorizedRequest(async (token) => {
        // build query params based on selected date range and driver
        const params: Record<string, string> = {};

        if (dateFilter?.from)
          params.start_date = formatDateStart(dateFilter.from);
        if (dateFilter?.to) params.end_date = formatDateEnd(dateFilter.to);

        // 🧩 add driver filter if driverID is selected
        if (driverFilter) params.driver_id = driverFilter;

        const res = await api.get('/pods/pods/', {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        // normalize the response
        const formattedPods = res.data.map((pod: any) => ({
          id: pod.id,
          tripId: pod.trip_id,
          deliveredTo: pod.delivered_to,
          notes: pod.notes,
          driverId: pod.driver_id,
          createdAt: pod.created_at,
          signature: pod.signature,
          files: pod.files || [],
        }));

        setPodsList(formattedPods);
      }, 'Failed to fetch PODs');
    } catch (error) {
      console.error('Error fetching PODs:', error);
      toast.error('Failed to load PODs');
    } finally {
      setLoadingPods(false);
    }
  };

  // refetch when date filter or driver changes
  useEffect(() => {
    fetchPods();
  }, [driverFilter, dateFilter]);

  const filteredPods = podsList.filter((pod) => {
    // 3) Date range filtering (NEW) — use createdAt (ISO) field:
    let matchesDate = true;
    if (dateFilter?.from) {
      // from start of day
      const fromDate = new Date(dateFilter.from);
      fromDate.setHours(0, 0, 0, 0);

      // to end of day (if to not provided, use same day as from)
      const toDate = new Date(dateFilter.to ?? dateFilter.from);
      toDate.setHours(23, 59, 59, 999);

      const podDate = new Date(pod.createdAt); // createdAt should be ISO string from backend

      matchesDate = podDate >= fromDate && podDate <= toDate;
    }

    return matchesDate;
  });

  const totalPages = Math.ceil(filteredPods.length / podsPerPage);
  const startIndex = (currentPage - 1) * podsPerPage;
  const paginatedPods = filteredPods.slice(
    startIndex,
    startIndex + podsPerPage
  );

  const fetchPodById = async (podId: string) => {
    if (!podId) return null;
    try {
      setLoadingPods(true);
      let fetchedPod = null;

      await authorizedRequest(async (token) => {
        const res = await api.get(`/pods/pods/pods/${podId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pod = res.data;

        // fetch the trip details
        const [tripRes] = await Promise.allSettled([
          api.get(`/trips/trips/${pod.trip_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // ✅ Format trip name like in your driverTrips
        let tripName = 'Unknown Trip';
        let driverName = 'Unknown Driver';

        if (tripRes.status === 'fulfilled') {
          const tripData = tripRes.value.data;

          const formattedType =
            tripData.delivery_type
              ?.replaceAll('_', ' ')
              .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
            'Unknown Type';

          const formattedTime = tripData.scheduled_time
            ? new Date(tripData.scheduled_time).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })
            : 'No time set';

          tripName = `${tripData.client_name || 'Unknown Client'} — ${formattedType} — ${formattedTime}`;

          driverName = tripData.driver_name || 'Unknown Driver';
        }

        const files: PodFile[] = Array.isArray(pod.files)
          ? pod.files.map((f: any) => ({
              id: f.id,
              s3_key: f.s3_key,
              name:
                (f.name as string) ??
                (f.s3_key
                  ? f.s3_key.split('/').pop()?.split('?')[0]
                  : undefined),
              url: f.url,
              type: f.file_type ?? undefined,
            }))
          : [];

        fetchedPod = {
          id: pod.id,
          tripId: pod.trip_id,
          deliveredTo: pod.delivered_to,
          notes: pod.notes,
          driverId: pod.driver_id,
          createdAt: pod.created_at,
          signature: pod.signature,
          files,
          tripName,
          driverName,
        };
      }, 'Failed to fetch POD details');

      return fetchedPod;
    } catch (error) {
      console.error('Error fetching single POD:', error);
      toast.error('Failed to load POD details');
      return null;
    } finally {
      setLoadingPods(false);
    }
  };

  const handleViewDetails = async (pod: any) => {
    const fetched = await fetchPodById(pod.id);
    if (fetched) setSelectedPod(fetched);
    setIsDetailsModalOpen(true);
  };

  const fetchPodFiles = async (podId: string) => {
    try {
      setLoadingFiles(true);

      await authorizedRequest(async (token) => {
        const res = await api.get(`/pods/pods/${podId}/files`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        const files: PodFile[] = Array.isArray(data)
          ? data.map((file) =>
              typeof file === 'string'
                ? {
                    name: file.split('/').pop()?.split('?')[0],
                    url: file,
                  }
                : {
                    name: file.s3_key.split('/').pop(),
                    url: file.url,
                    type: file.file_type,
                  }
            )
          : [];

        setPodFiles(files);
      }, 'Failed to get files');
    } catch (err: any) {
      console.error('Error fetching pod files:', err);
      toast.error('Failed to load files for this POD.');
    } finally {
      setLoadingFiles(false);
    }
  };

  // ✅ Open modal and fetch files
  const handleViewFiles = async (pod: any) => {
    setSelectedPod(pod);
    await fetchPodFiles(pod.id);
    setIsFilesModalOpen(true);
  };

  const handleOpenFile = (file: PodFile) => {
    if (!file.url) {
      toast.error('File URL not found.');
      return;
    }

    window.open(file.url, '_blank'); // opens in new tab
    toast.success(`Opened ${file.name}`);
  };

  const handleDownloadFile = async (file: PodFile) => {
    const s3Key = file?.s3_key || file?.url?.split('/pods/')[1]?.split('?')[0];
    if (!s3Key) return toast.error('File key missing');

    const filename = s3Key.split('/').pop();
    if (!filename) return toast.error('Invalid file key');

    try {
      await authorizedRequest(async (token) => {
        const res = await api.get(
          `/pods/pods/download/${encodeURIComponent(filename)}`,
          {
            responseType: 'arraybuffer',
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const blob = new Blob([res.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = file.name ?? filename;
        link.click();
        URL.revokeObjectURL(link.href);
      }, 'Failed to download');
      toast.success('Download started');
    } catch (err) {
      console.error(err);
      toast.error('Failed to download file');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const deletePod = async (podId: string) => {
    console.log('delete pod');
    if (!podId) {
      toast.error('Invalid POD ID');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        await api.delete(`/pods/pods/pods/${podId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }, 'Failed to delete POD');

      // remove from local state
      setPodsList((prev) => prev.filter((pod) => pod.id !== podId));

      toast.success('POD deleted successfully');
    } catch (error: any) {
      console.error('Error deleting POD:', error);
      toast.error(
        error?.response?.data?.detail?.[0]?.msg || 'Failed to delete POD'
      );
    }
  };

  const handleDeletePod = async (podId: string) => {
    setDeleting(true);
    await deletePod(podId);
    setDeleting(false);
    setOpen(false);
  };

  return {
    loadingPods,
    podsList,
    setPodsList,
    dateFilter,
    setDateFilter,
    driverFilter,
    setDriverFilter,
    selectedPod,
    setSelectedPod,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isFilesModalOpen,
    setIsFilesModalOpen,
    currentPage,
    setCurrentPage,
    podsPerPage,
    loadingTrips,
    open,
    setOpen,
    deleting,
    driverTrips,
    formData,
    setFormData,
    driverID,
    filteredPods,
    totalPages,
    startIndex,
    paginatedPods,
    fetchDriverTrips,
    handleCreatePod,
    fetchPods,
    fetchPodById,
    handleViewDetails,
    podFiles,
    loadingFiles,
    handleOpenFile,
    handleDownloadFile,
    handleViewFiles,
    formatDate,
    formatFileSize,
    handleOpenCreateModal,
    deletePod,
    handleDeletePod,
  };
}
