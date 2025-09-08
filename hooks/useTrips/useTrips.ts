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
} from './api';
import { formatDateTime } from './utils';
import { clients, drivers, trips } from './constants';

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

    setLoading(true);
    try {
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
        cost: formData.cost,
        distance_km: formData.distanceKm,
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
      setLoading(true);
      const data = await authorizedRequest<any>(
        (token) => fetchTripByIdRequest(token, tripId),
        'Failed to fetch trip details'
      );
      if (!data) return null;
      return mapApiTripToUiTrip(data as Trip);
    } catch (err) {
      console.error('fetchTripById error', err);
      return null;
    } finally {
      setLoading(false);
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

  // const handleEdit = (trip: (typeof trips)[0]) => {
  //   setSelectedTrip(trip);
  //   setFormData({
  //     clientName: trip.clientName,
  //     pickupLocation: trip.pickupLocation,
  //     dropoffLocation: trip.dropoffLocation,
  //     driverName: trip.driverName,
  //     dateTime: trip.dateTime,
  //     notes: trip.notes,
  //     status: trip.status || 'Pending',
  //     priority: trip.priority || 'Normal',
  //   });
  //   setIsEditModalOpen(true);
  // };

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
    // handleEdit,
    handleDeleteTrip,
    handleQuickStatusUpdate,
    handleUpdateTrip,
  };
}
