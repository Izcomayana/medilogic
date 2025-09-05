import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { useProfile } from './useProfile';
import React from 'react';
import {
  formatDateEnd,
  formatDateStart,
} from '@/app/(dashboard)/company-admin/(pages)/trips/components/Filters/dateRange';

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

type Trip = {
  driver_id: string;
  driver_name: string | null;
  delivery_type: string;
  scheduled_time: string | null;
  cost: number | null;
  client_name: string | null;
  organization_id: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  distance_km: number | null;
  status: string | null;
  vehicle_type: string | null;
  location_zone: string | null;
  shift_window: string | null;
  compliance_flag: boolean | null;
  recurrence_rule: string | null;
  priority: string | null;
  custom_delivery_description: string | null;
  id: string;
  created_at: string;
};

export type DateRangeLocal = { from?: Date; to?: Date };

export function useTrips(tripsPerPage = 10) {
  const [tripsList, setTripsList] = useState<any[]>([]);
  const [totalTrips, setTotalTrips] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = React.useState<DateRangeLocal>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<(typeof trips)[0] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setTripToDelete] = useState<string | null>(null);
  const { user, loading: userLoading } = useProfile();

  const [formData, setFormData] = useState({
    clientOrganization: '',
    pickupLocation: '',
    dropoffLocation: '',
    driverAssigned: '',
    dateTime: '',
    notes: '',
    status: 'Pending',
  });

  const authorizedRequest = useAuthorizedRequest();

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

  // 🔄 Map API trip → UI trip
  function mapApiTripToUiTrip(apiTrip: Trip) {
    return {
      id: apiTrip.id,
      clientOrganization: apiTrip.client_name,
      pickupLocation: apiTrip.pickup_location,
      dropoffLocation: apiTrip.dropoff_location,
      driverAssigned: apiTrip.driver_name,
      status: apiTrip.status,
      dateTime: apiTrip.scheduled_time,
      notes: apiTrip.custom_delivery_description,
      createdDate: apiTrip.created_at,
      statusHistory: [
        {
          status: apiTrip.status,
          timestamp: apiTrip.created_at,
          note: apiTrip.custom_delivery_description || '',
        },
      ],
    };
  }

  type UiTrip = ReturnType<typeof mapApiTripToUiTrip>;

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const data = await authorizedRequest<any>(async (token) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/trips',
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              status: statusFilter !== 'all' ? statusFilter : undefined,
              driver_name: searchTerm || undefined,
              client_name: searchTerm || undefined,
              skip: (currentPage - 1) * tripsPerPage,
              limit: tripsPerPage,
              from_date: dateRange?.from
                ? formatDateStart(dateRange.from)
                : undefined, // '2025-06-10T00:00:00'
              to_date: dateRange?.to
                ? formatDateEnd(dateRange.to)
                : dateRange?.from
                  ? formatDateEnd(dateRange.from)
                  : undefined,
              sort_by: 'scheduled_time',
              sort_order: 'desc',
            },
          }
        );
        return res.data;
      }, 'Failed to fetch trips');

      if (!data) {
        setTripsList([]);
        setTotalTrips(0);
        return;
      }

      // Normalise to an array of API trips
      let items: any[] = [];
      let total = 0;
      if (Array.isArray(data)) {
        items = data;
        total = data.length;
      } else if (data && Array.isArray(data.items)) {
        items = data.items;
        total = data.total ?? data.items.length;
      } else {
        items = [];
        total = 0;
      }

      // Map API trips -> UI trips
      const mapped: UiTrip[] = items.map(mapApiTripToUiTrip);

      setTripsList(mapped);
      setTotalTrips(total);
      console.log('total:', total);
    } catch (err) {
      console.error('fetchTrips error', err);
      setTripsList([]);
      setTotalTrips(0);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refetch whenever filters or pagination change
  useEffect(() => {
    fetchTrips();
    console.log('totalTrips:', totalTrips);
  }, [statusFilter, searchTerm, dateRange, currentPage]);

  const filteredTrips = tripsList;
  const paginatedTrips = tripsList;
  const totalPages = Math.ceil(totalTrips / tripsPerPage);
  const startIndex = (currentPage - 1) * tripsPerPage;

  //  create trip
  const handleCreateTrip = async () => {
    if (userLoading) {
      toast(
        'Organization info is still loading, please try again after few seconds.'
      );
      return;
    }

    if (!user?.organization.id) {
      toast.error('No organization found for this user');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        delivery_type: 'clinical_waste',
        organization_id: user.organization.id,
        status: formData.status || 'Pending',
        driver_name: formData.driverAssigned || undefined,
        scheduled_time: formData.dateTime
          ? new Date(formData.dateTime).toISOString()
          : undefined,
        client_name: user.organization.name,
        pickup_location: formData.pickupLocation || undefined,
        dropoff_location: formData.dropoffLocation || undefined,
        custom_delivery_description: formData.notes || undefined,
      };

      const created = await authorizedRequest<Trip>(async (token) => {
        const res = await axios.post<Trip>(
          'https://medilogic-backend.onrender.com/trips/',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
      }, 'Failed to create trip');

      if (!created) return;

      const createdUiTrip = mapApiTripToUiTrip(created);
      setTripsList((prev) => [createdUiTrip, ...prev]);
      setIsCreateModalOpen(false);
      resetForm();
      toast.success('Trip created successfully');
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

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
    loading,
    clients,
    drivers,
    searchTerm,
    statusFilter,
    dateRange,
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
    fetchTrips,
    setTripsList,
    setSearchTerm,
    setStatusFilter,
    setDateRange,
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
