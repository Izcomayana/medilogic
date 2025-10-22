/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';
import { Pod, PodFile } from './typePod';

export function usePods() {
  const [loadingPods, setLoadingPods] = useState(false);
  const [podsList, setPodsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
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

  // const driverName = user?.name ?? '';
  const driverID = user?.user_id ?? '';

  // Form state for new POD
  const [formData, setFormData] = useState({
    id: '',
    driver_id: driverID,
    tripId: '',
    signature: '',
    notes: '',
    deliveredTo: '',
    files: null as File | null,
  });

  // Filter PODs
  const filteredPods = podsList.filter((pod) => {
    const matchesSearch =
      pod.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClient = clientFilter === 'all' || pod.client === clientFilter;
    const matchesStatus = statusFilter === 'all' || pod.status === statusFilter;
    const matchesDate =
      dateFilter === 'all' || pod.deliveryDate.startsWith(dateFilter);

    return matchesSearch && matchesClient && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredPods.length / podsPerPage);
  const startIndex = (currentPage - 1) * podsPerPage;
  const paginatedPods = filteredPods.slice(
    startIndex,
    startIndex + podsPerPage
  );

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

        if (formData.files) {
          formDataToSend.append('file', formData.files);
        }

        const res = await api.post('/pods/pods/upload', formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // Reset form
        setFormData({
          id: '',
          driver_id: '',
          tripId: '',
          signature: '',
          notes: '',
          deliveredTo: '',
          files: null,
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

  const fetchPods = async () => {
    try {
      setLoadingPods(true);
      await authorizedRequest(async (token) => {
        const res = await api.get('/pods/pods/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Transform the data slightly for display
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

  useEffect(() => {
    fetchPods();
  }, [driverID]);

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
        fetchedPod = {
          id: pod.id,
          tripId: pod.trip_id,
          deliveredTo: pod.delivered_to,
          notes: pod.notes,
          driverId: pod.driver_id,
          createdAt: pod.created_at,
          signature: pod.signature,
          files: pod.files || [],
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

  const handleDownloadFile = (file: PodFile) => {
    if (!file.url) {
      toast.error('File URL not found.');
      return;
    }

    window.open(file.url, '_blank'); // opens in new tab
    toast.success(`Opened ${file.name}`);
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

  // const getFileType = (fileName: string) => {
  //   const ext = fileName.split('.').pop()?.toUpperCase();
  //   switch (ext) {
  //     case 'PDF':
  //       return 'PDF';
  //     case 'JPG':
  //     case 'JPEG':
  //     case 'PNG':
  //     case 'GIF':
  //       return 'Image';
  //     case 'DOC':
  //     case 'DOCX':
  //       return 'Document';
  //     default:
  //       return 'File';
  //   }
  // };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  return {
    loadingPods,
    podsList,
    setPodsList,
    searchTerm,
    setSearchTerm,
    clientFilter,
    setClientFilter,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
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
    handleDownloadFile,
    handleViewFiles,
    formatDate,
    formatFileSize,
    handleOpenCreateModal,
  };
}
