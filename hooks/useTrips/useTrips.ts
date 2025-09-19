import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '../useProfile';
import React from 'react';
import { mapApiTripToUiTrip, UiTrip, Trip } from './mappers';
import {
  fetchTripsRequest,
  fetchTripByIdRequest,
  createTripRequest,
  deleteTripRequest,
  partialUpdateTripRequest,
  updateTripRequest,
} from './api';
import { formatDateTime } from './utils';
import { clients, drivers } from './constants';

export type DateRangeLocal = { from?: Date; to?: Date };

export function useTrips(tripsPerPage = 10) {
  const [tripsList, setTripsList] = useState<any[]>([]);
  const [totalTrips, setTotalTrips] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = React.useState<DateRangeLocal>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<UiTrip | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setTripToDelete] = useState<string | null>(null);
  const { user, loading: userLoading } = useProfile();

  const [formData, setFormData] = useState({
    clientName: '',
    pickupLocation: '',
    dropoffLocation: '',
    driverName: '',
    // driverAsigned: '',
    driverId: '',
    dateTime: '',
    notes: '',
    status: 'Pending',
    priority: 'normal',
    deliveryType: 'clinical_waste',
    customDeliveryDescription: '',
    cost: '',
    distanceKm: '',
    vehicleType: '',
    locationZone: '',
    shiftWindow: '',
    complianceFlag: false,
    recurrenceRule: 'none',
  });

  const authorizedRequest = useAuthorizedRequest();

  const resetForm = () => {
    setFormData({
      clientName: '',
      pickupLocation: '',
      dropoffLocation: '',
      driverName: '',
      // driverAsigned: '',
      driverId: '',
      dateTime: '',
      notes: '',
      status: 'Pending',
      priority: 'normal',
      deliveryType: 'clinical_waste',
      customDeliveryDescription: '',
      cost: '',
      distanceKm: '',
      vehicleType: '',
      locationZone: '',
      shiftWindow: '',
      complianceFlag: false,
      recurrenceRule: 'none',
    });
    setSelectedTrip(null);
  };

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const data = await authorizedRequest<any>(
        (token) =>
          fetchTripsRequest(token, {
            statusFilter,
            searchTerm,
            dateRange,
            currentPage,
            tripsPerPage,
          }),
        'Failed to fetch trips'
      );

      if (!data) {
        setTripsList([]);
        setTotalTrips(0);
        return;
      }

      let items: any[] = [];
      let total = 0;
      if (Array.isArray(data)) {
        items = data;
        total = data.length;
      } else if (data && Array.isArray(data.items)) {
        items = data.items;
        total = data.total ?? data.items.length;
      }

      const mapped: UiTrip[] = items.map(mapApiTripToUiTrip);
      setTripsList(mapped);
      setTotalTrips(total);
      console.log('total:', totalTrips);
    } catch (err) {
      console.error('fetchTrips error', err);
      setTripsList([]);
      setTotalTrips(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
    console.log('totalTrips:', totalTrips);
  }, [statusFilter, searchTerm, dateRange, currentPage]);

  const filteredTrips = tripsList;
  const paginatedTrips = tripsList;
  const totalPages = Math.ceil(totalTrips / tripsPerPage);
  const startIndex = (currentPage - 1) * tripsPerPage;

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

    try {
      setLoading(true);
      const payload = {
        delivery_type: formData.deliveryType,
        organization_id: user.organization.id,
        status: formData.status || 'Pending',
        priority: formData.priority || 'normal',
        driver_id: formData.driverId || undefined,
        driver_name: formData.driverName || undefined,
        scheduled_time: formData.dateTime
          ? new Date(formData.dateTime).toISOString()
          : undefined,
        client_name: formData.clientName,
        pickup_location: formData.pickupLocation || undefined,
        dropoff_location: formData.dropoffLocation || undefined,
        notes: formData.notes,
        cost: formData.cost || null,
        distance_km: formData.distanceKm || null,
        vehicle_type: formData.vehicleType || undefined,
        location_zone: formData.locationZone || undefined,
        shift_window: formData.shiftWindow || undefined,
        compliance_flag: formData.complianceFlag || false,
        recurrence_rule: formData.recurrenceRule || 'none',
        custom_delivery_description:
          formData.deliveryType === 'other'
            ? formData.customDeliveryDescription
            : formData.notes || undefined,
      };

      const created = await authorizedRequest<Trip>(
        (token) => createTripRequest(token, payload),
        'Failed to create trip'
      );

      if (!created) return;

      const createdUiTrip = mapApiTripToUiTrip(created);
      setTripsList((prev) => [createdUiTrip, ...prev]);
      resetForm();
      setIsCreateModalOpen(false);
      toast.success('Trip created successfully');
    } finally {
      setLoading(false);
    }
  };

  const fetchTripById = async (tripId: string) => {
    try {
      const data = await authorizedRequest<Trip>(
        (token) => fetchTripByIdRequest(token, tripId),
        'Failed to fetch trip details'
      );
      if (!data) return null;
      return mapApiTripToUiTrip(data as Trip);
    } catch (err) {
      console.error('fetchTripById error', err);
      return null;
    }
  };

  const handleViewDetails = async (trip: { id: string }) => {
    const detailedTrip = await fetchTripById(trip.id);
    if (detailedTrip) {
      setSelectedTrip(detailedTrip);
      setIsDetailsModalOpen(true);
    } else {
      toast.error('Failed to load trip details');
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      await authorizedRequest(
        (token) => deleteTripRequest(token, tripId),
        'Failed to delete trip'
      );

      setTripsList((prev) => prev.filter((trip) => trip.id !== tripId));
      toast.success('Trip deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete trip');
    }
  };

  async function handleQuickStatusUpdate(tripId: string, newStatus: string) {
    // optimistic UI is possible, but here we update only after a successful API response
    try {
      setLoading(true);
      // Try to read required fields from local UI cache first
      const local = tripsList.find((t: any) => t.id === tripId);
      let delivery_type: string | undefined = local?.deliveryType;
      let organization_id: string | undefined = local?.organizationId;

      // If any required field is missing, fetch the full trip from the API
      if (!delivery_type || !organization_id) {
        const fetched = await authorizedRequest<any>(
          (token) => fetchTripByIdRequest(token, tripId),
          'Failed to fetch trip for update'
        );
        if (!fetched) {
          toast.error('Failed to retrieve trip details');
          return;
        }
        delivery_type = fetched.delivery_type;
        organization_id = fetched.organization_id;
      }

      // Ensure we have required fields the backend expects
      if (!delivery_type || !organization_id) {
        toast.error('Missing required trip fields for update');
        return;
      }

      // Build minimal payload containing required fields + status
      const payload: Partial<Trip> = {
        status: newStatus,
        delivery_type,
        organization_id,
      };

      // Call patch endpoint
      const updated = await authorizedRequest<Trip>(
        (token) => partialUpdateTripRequest(token, tripId, payload),
        'Failed to update trip status'
      );

      if (!updated) {
        toast.error('Failed to update trip status');
        return;
      }

      // Replace local item with server truth
      const mapped = mapApiTripToUiTrip(updated);
      setTripsList((prev: any[]) =>
        prev.map((t) => (t.id === tripId ? mapped : t))
      );

      toast.success(`Trip status updated to ${newStatus}`);
    } catch (err) {
      console.error('handleQuickStatusUpdate error:', err);
      toast.error('Failed to update trip status');
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (trip: UiTrip) => {
    setSelectedTrip(trip);
    setFormData({
      clientName: trip.clientName || '',
      pickupLocation: trip.pickupLocation || '',
      dropoffLocation: trip.dropoffLocation || '',
      driverName: trip.driverName || '',
      driverId: trip.driverId || '',
      // driverAsigned: trip.driverAssigned || '',
      dateTime: trip.dateTime || '',
      notes: trip.statusHistory?.[0]?.note || '',
      status: trip.status || 'Pending',
      priority: trip.priority || 'normal',
      deliveryType: trip.deliveryType || 'clinical_waste',
      customDeliveryDescription: trip.statusHistory?.[0]?.note || '',
      cost: '0',
      distanceKm: '0',
      vehicleType: '',
      locationZone: '',
      shiftWindow: '',
      complianceFlag: false,
      recurrenceRule: 'none',
    });
    setIsEditModalOpen(true);
  };

  const updateTrip = async (tripId: string, updatedData: Partial<Trip>) => {
    try {
      setLoading(true);

      const updated = await authorizedRequest<Trip>(
        (token) => updateTripRequest(token, tripId, updatedData),
        'Failed to update trip'
      );

      if (!updated) return;

      // Map backend trip → UI trip
      const updatedUiTrip = mapApiTripToUiTrip(updated);

      // Update local cache
      setTripsList((prev) =>
        prev.map((trip) => (trip.id === tripId ? updatedUiTrip : trip))
      );

      setIsEditModalOpen(false);
      resetForm();
      toast.success('Trip updated successfully');
    } catch (err) {
      console.error('updateTrip error:', err);
      toast.error('Failed to update trip');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTrip = async () => {
    if (!selectedTrip) return;

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

    const payload: Partial<Trip> = {
      driver_name: formData.driverName || undefined,
      driver_id: formData.driverId || undefined,
      delivery_type: formData.deliveryType,
      scheduled_time: formData.dateTime
        ? new Date(formData.dateTime).toISOString()
        : undefined,
      cost: formData.cost,
      client_name: formData.clientName,
      organization_id: user?.organization?.id || undefined,
      pickup_location: formData.pickupLocation || undefined,
      dropoff_location: formData.dropoffLocation || undefined,
      distance_km: formData.distanceKm,
      status: formData.status,
      vehicle_type: formData.vehicleType || undefined,
      location_zone: formData.locationZone || undefined,
      shift_window: formData.shiftWindow || undefined,
      compliance_flag: formData.complianceFlag,
      recurrence_rule: formData.recurrenceRule,
      priority: formData.priority,
      custom_delivery_description: formData.customDeliveryDescription,
    };

    await updateTrip(selectedTrip.id, payload);
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
    handleDeleteTrip,
    handleQuickStatusUpdate,
    handleUpdateTrip,
  };
}
