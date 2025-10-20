'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
  const [podsList, setPodsList] = useState(initialPods);
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

  // Form state for new POD
  const [formData, setFormData] = useState({
    tripId: '',
    client: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    notes: '',
    file: null as File | null,
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

  const handleCreatePod = () => {
    if (!formData.tripId || !formData.deliveryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPod = {
      id: `POD${String(podsList.length + 1).padStart(3, '0')}`,
      tripId: formData.tripId,
      client:
        completedTrips.find((t) => t.id === formData.tripId)?.client ||
        formData.client ||
        'Unknown',
      deliveryDate: formData.deliveryDate,
      uploadedAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Delivered',
      files: formData.file
        ? [
            {
              name: formData.file.name,
              size: formatFileSize(formData.file.size),
              type: getFileType(formData.file.name),
            },
          ]
        : [],
      notes: formData.notes,
    };

    setPodsList([newPod, ...podsList]);
    setIsCreateModalOpen(false);
    setFormData({
      tripId: '',
      client: '',
      deliveryDate: new Date().toISOString().split('T')[0],
      notes: '',
      file: null,
    });
    toast.success('POD uploaded successfully');
  };

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

  const getFileType = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toUpperCase();
    switch (ext) {
      case 'PDF':
        return 'PDF';
      case 'JPG':
      case 'JPEG':
      case 'PNG':
      case 'GIF':
        return 'Image';
      case 'DOC':
      case 'DOCX':
        return 'Document';
      default:
        return 'File';
    }
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  return {
    initialPods,
    completedTrips,
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
    formData,
    setFormData,
    filteredPods,
    totalPages,
    startIndex,
    paginatedPods,
    handleCreatePod,
    handleViewDetails,
    handleViewFiles,
    handleDownloadFile,
    formatDate,
    formatFileSize,
    handleOpenCreateModal,
  };
}
