import { useState } from 'react';
import { toast } from 'sonner';

const trips = [
  {
    id: 'TRP001',
    clientOrganization: 'Clinic ABC',
    pickupLocation: '123 Medical Center Dr, Lagos',
    dropoffLocation: '456 Waste Facility Rd, Lagos',
    driverAssigned: 'John Smith',
    status: 'Completed',
    dateTime: '2025-08-22 09:00',
    notes: 'Medical waste pickup - handle with care',
    createdDate: '2025-08-20',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 08:00',
        note: 'Trip created',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-22 09:00',
        note: 'Driver started pickup',
      },
      {
        status: 'Completed',
        timestamp: '2025-08-22 11:30',
        note: 'Waste delivered successfully',
      },
    ],
  },
  {
    id: 'TRP002',
    clientOrganization: 'TechCorp Solutions',
    pickupLocation: '789 Business Park, Abuja',
    dropoffLocation: '321 Recycling Center, Abuja',
    driverAssigned: 'Sarah Johnson',
    status: 'In Progress',
    dateTime: '2025-08-23 14:00',
    notes: 'Electronic waste disposal',
    createdDate: '2025-08-21',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-23 13:30',
        note: 'Trip scheduled',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-23 14:00',
        note: 'Driver en route to pickup',
      },
    ],
  },
  {
    id: 'TRP003',
    clientOrganization: 'PharmaCare Industries',
    pickupLocation: '555 Pharma Complex, Port Harcourt',
    dropoffLocation: '777 Hazmat Facility, Port Harcourt',
    driverAssigned: 'Mike Davis',
    status: 'Pending',
    dateTime: '2025-08-24 10:00',
    notes: 'Pharmaceutical waste - requires special handling certification',
    createdDate: '2025-08-22',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 16:00',
        note: 'Trip scheduled for tomorrow',
      },
    ],
  },
  {
    id: 'TRP004',
    clientOrganization: 'WasteTech Solutions',
    pickupLocation: '999 Industrial Zone, Kano',
    dropoffLocation: '111 Treatment Plant, Kano',
    driverAssigned: 'Lisa Wilson',
    status: 'Cancelled',
    dateTime: '2025-08-21 08:00',
    notes: 'Industrial waste collection',
    createdDate: '2025-08-19',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-19 15:00',
        note: 'Trip created',
      },
      {
        status: 'Cancelled',
        timestamp: '2025-08-21 07:30',
        note: 'Client requested cancellation',
      },
    ],
  },
];

const clients = [
  'Clinic ABC',
  'TechCorp Solutions',
  'PharmaCare Industries',
  'WasteTech Solutions',
  'HealthCare Plus',
];
const drivers = [
  'John Smith',
  'Sarah Johnson',
  'Mike Davis',
  'Lisa Wilson',
  'Tom Brown',
  'Alex Chen',
];

export function useTrips(tripsPerPage = 10) {
  const [tripsList, setTripsList] = useState(trips);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<(typeof trips)[0] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientOrganization: '',
    pickupLocation: '',
    dropoffLocation: '',
    driverAssigned: '',
    dateTime: '',
    notes: '',
    status: 'Pending',
  });

  const filteredTrips = tripsList.filter((trip) => {
    const matchesSearch =
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.clientOrganization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      trip.driverAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      trip.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate =
      dateFilter === 'all' || trip.dateTime.startsWith(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const resetForm = () => {
    setFormData({
      clientOrganization: '',
      pickupLocation: '',
      dropoffLocation: '',
      driverAssigned: '',
      dateTime: '',
      notes: '',
      status: 'Pending',
    });
    setSelectedTrip(null);
  };

  const handleCreateTrip = () => {
    const newTrip = {
      id: `TRP${String(tripsList.length + 1).padStart(3, '0')}`,
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      statusHistory: [
        {
          status: formData.status,
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          note: 'Trip created',
        },
      ],
    };
    setTripsList((prev) => [newTrip, ...prev]);
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Trip created successfully');
  };

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const startIndex = (currentPage - 1) * tripsPerPage;
  const paginatedTrips = filteredTrips.slice(
    startIndex,
    startIndex + tripsPerPage
  );

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = (trip: (typeof trips)[0]) => {
    setSelectedTrip(trip);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (trip: (typeof trips)[0]) => {
    setSelectedTrip(trip);
    setFormData({
      clientOrganization: trip.clientOrganization,
      pickupLocation: trip.pickupLocation,
      dropoffLocation: trip.dropoffLocation,
      driverAssigned: trip.driverAssigned,
      dateTime: trip.dateTime,
      notes: trip.notes,
      status: trip.status,
    });
    setIsEditModalOpen(true);
  };

  const handleQuickStatusUpdate = (tripId: string, newStatus: string) => {
    setTripsList((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              status: newStatus,
              statusHistory: [
                ...trip.statusHistory,
                {
                  status: newStatus,
                  timestamp: new Date()
                    .toISOString()
                    .slice(0, 16)
                    .replace('T', ' '),
                  note: 'Quick status update',
                },
              ],
            }
          : trip
      )
    );
    toast.success(`Trip status updated to ${newStatus}`);
  };

  const handleUpdateTrip = () => {
    if (!selectedTrip) return;
    setTripsList((prev) =>
      prev.map((trip) =>
        trip.id === selectedTrip.id
          ? {
              ...trip,
              ...formData,
              statusHistory:
                trip.status !== formData.status
                  ? [
                      ...trip.statusHistory,
                      {
                        status: formData.status,
                        timestamp: new Date()
                          .toISOString()
                          .slice(0, 16)
                          .replace('T', ' '),
                        note: 'Status updated',
                      },
                    ]
                  : trip.statusHistory,
            }
          : trip
      )
    );
    setIsEditModalOpen(false);
    resetForm();
    toast.success('Trip updated successfully');
  };

  return {
    clients,
    drivers,
    searchTerm,
    statusFilter,
    dateFilter,
    isCreateModalOpen,
    isDetailsModalOpen,
    formData,
    filteredTrips,
    paginatedTrips,
    totalPages,
    startIndex,
    tripsPerPage,
    currentPage,
    selectedTrip,
    isEditModalOpen,
    setTripsList,
    setSearchTerm,
    setStatusFilter,
    setDateFilter,
    setIsCreateModalOpen,
    setIsDetailsModalOpen,
    setIsEditModalOpen,
    resetForm,
    setFormData,
    setTripToDelete,
    setCurrentPage,
    handleCreateTrip,
    formatDateTime,
    handleViewDetails,
    handleEdit,
    handleQuickStatusUpdate,
    handleUpdateTrip,
  };
}
