/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';

// Mock data for PODs
const initialPods = [
  {
    id: 'POD001',
    tripId: 'TRIP001',
    client: 'Clinic ABC',
    deliveryDate: '2025-08-23',
    uploadedAt: '2025-08-23 14:35',
    status: 'Delivered',
    files: [{ name: 'delivery_receipt_001.pdf', size: '245 KB', type: 'PDF' }],
    notes: 'Delivered to reception desk, signed by Dr. Johnson',
  },
  {
    id: 'POD002',
    tripId: 'TRIP002',
    client: 'TechCorp Solutions',
    deliveryDate: '2025-08-22',
    uploadedAt: '2025-08-22 16:20',
    status: 'Delivered',
    files: [
      { name: 'proof_delivery_002.jpg', size: '1.2 MB', type: 'Image' },
      { name: 'receipt_002.pdf', size: '156 KB', type: 'PDF' },
    ],
    notes: 'Delivered at main office entrance',
  },
  {
    id: 'POD003',
    tripId: 'TRIP003',
    client: 'PharmaCare Industries',
    deliveryDate: '2025-08-21',
    uploadedAt: '2025-08-21 11:45',
    status: 'Delivered',
    files: [{ name: 'pod_003_signature.jpg', size: '890 KB', type: 'Image' }],
    notes: 'Hazmat delivery received and signed',
  },
  {
    id: 'POD004',
    tripId: 'TRIP004',
    client: 'WasteTech Solutions',
    deliveryDate: '2025-08-20',
    uploadedAt: '2025-08-20 13:10',
    status: 'Pending',
    files: [],
    notes: 'Waiting for file upload',
  },
];

// Mock completed trips for dropdown
const completedTrips = [
  { id: 'TRIP001', client: 'Clinic ABC' },
  { id: 'TRIP002', client: 'TechCorp Solutions' },
  { id: 'TRIP003', client: 'PharmaCare Industries' },
  { id: 'TRIP004', client: 'WasteTech Solutions' },
  { id: 'TRIP005', client: 'Healthcare Plus' },
];

export function usePods() {
  const [loadingPods, setLoadingPods] = useState(false);
  const [podsList, setPodsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPod, setSelectedPod] = useState<
    (typeof initialPods)[0] | null
  >(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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

        const newPod = res.data;
        setPodsList((prev) => [newPod, ...prev]);

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

        toast.success('POD created successfully ✅');
        setIsCreateModalOpen(false);
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

  const handleViewDetails = (pod: (typeof initialPods)[0]) => {
    setSelectedPod(pod);
    setIsDetailsModalOpen(true);
  };

  const handleViewFiles = (pod: (typeof initialPods)[0]) => {
    setSelectedPod(pod);
    setIsFilesModalOpen(true);
  };

  const handleDownloadFile = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
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
    initialPods,
    completedTrips,
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
    handleViewDetails,
    handleViewFiles,
    handleDownloadFile,
    formatDate,
    formatFileSize,
    handleOpenCreateModal,
  };
}
