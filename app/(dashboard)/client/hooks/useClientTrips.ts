'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { mapApiTripToUiTrip, UiTrip } from '@/hooks/trips/mappers';
import { formatDateStart, formatDateEnd } from '@/utils/datetime';
import { api } from '@/lib/api';

export type ClientTripsFilters = {
  status?: string;
  deliveryType?: string;
  dateRange?: { from?: Date; to?: Date };
  searchTerm?: string;
};

type AssignedTripsResponse = {
  client_id: string;
  total_trips: number;
  assigned_trips: Trip[];
};

type CreateClientTripPayload = {
  delivery_type: string;
  custom_delivery_description?: string;
  pickup_location: string;
  dropoff_location: string;
  distance_km: number;
  scheduled_time: string;
  priority: string;
  requires_pin: boolean;
};

type Trip = any;

export function useClientTrips(clientId?: string) {
  const authorizedRequest = useAuthorizedRequest();

  const [createdTrips, setCreatedTrips] = useState<Trip[]>([]);
  const [assignedTrips, setAssignedTrips] = useState<Trip[]>([]);

  const [loadingCreated, setLoadingCreated] = useState(false);
  const [loadingAssigned, setLoadingAssigned] = useState(false);

  const [createdFilters, setCreatedFilters] = useState<ClientTripsFilters>({});
  const [assignedFilters, setAssignedFilters] = useState<ClientTripsFilters>(
    {}
  );

  const fetchCreatedTrips = async () => {
    try {
      setLoadingCreated(true);
      await authorizedRequest(async (token) => {
        const params = new URLSearchParams({
          ...(createdFilters.status &&
            createdFilters.status !== 'all' && {
              status: createdFilters.status,
            }),
          ...(createdFilters.deliveryType && {
            delivery_type: createdFilters.deliveryType,
          }),
          ...(createdFilters.dateRange?.from && {
            start_date: formatDateStart(createdFilters.dateRange.from),
          }),
          ...(createdFilters.dateRange?.to
            ? { end_date: formatDateEnd(createdFilters.dateRange.to) }
            : createdFilters.dateRange?.from
              ? { end_date: formatDateEnd(createdFilters.dateRange.from) }
              : {}),
        });

        const res = await api.get<Trip[]>(
          `/client/trips/?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const mapped = res.data.map(mapApiTripToUiTrip);

        setCreatedTrips(mapped);
      }, 'Failed to fetch client trips');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCreated(false);
    }
  };

  const fetchAssignedTrips = async () => {
    if (!clientId) return;

    try {
      setLoadingAssigned(true);

      await authorizedRequest(async (token) => {
        const params = new URLSearchParams();

        if (assignedFilters.status && assignedFilters.status !== 'all') {
          params.append('status', assignedFilters.status);
        }

        if (assignedFilters.dateRange?.from) {
          params.append(
            'start_date',
            assignedFilters.dateRange.from.toISOString()
          );
        }

        if (assignedFilters.dateRange?.to) {
          params.append('end_date', assignedFilters.dateRange.to.toISOString());
        }
        const res = await api.get<AssignedTripsResponse>(
          `/client/trips/client/${clientId}/trips?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;

        const mapped = (data.assigned_trips || []).map(mapApiTripToUiTrip);

        setAssignedTrips(mapped);
      }, 'Failed to get assigned trips');
    } catch (err) {
      console.error('Assigned trips error:', err);
    } finally {
      setLoadingAssigned(false);
    }
  };

  useEffect(() => {
    fetchCreatedTrips();
  }, [createdFilters]);

  useEffect(() => {
    fetchAssignedTrips();
  }, [assignedFilters, clientId]);

  const createClientTrip = useCallback(
    async (payload: CreateClientTripPayload) => {
      try {
        await authorizedRequest(async (token) => {
          await api.post('/client/trips/', payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }, 'Failed to create trip');

        toast.success('Trip created successfully');

        // 🔥 refresh trips
        fetchCreatedTrips();
      } catch (error: any) {
        const msg = error?.response?.data?.detail ?? 'Failed to create trip';

        toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    },
    [authorizedRequest]
  );

  const cancelClientTrip = useCallback(
    async (tripId: string) => {
      try {
        await authorizedRequest(async (token) => {
          await api.patch(
            `/client/trips/${tripId}/status`,
            { status: 'cancelled' },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }, 'Failed to cancel trip');

        toast.success('Trip cancelled successfully');
        fetchCreatedTrips(); // refresh
      } catch {
        toast.error('Failed to cancel trip');
      }
    },
    [authorizedRequest, fetchCreatedTrips]
  );

  return {
    createdTrips,
    loadingCreated,
    createdFilters,
    setCreatedFilters,

    // assigned
    assignedTrips,
    loadingAssigned,
    assignedFilters,
    setAssignedFilters,
    refetch: fetchCreatedTrips,
    createClientTrip,
    cancelClientTrip,
  };
}
