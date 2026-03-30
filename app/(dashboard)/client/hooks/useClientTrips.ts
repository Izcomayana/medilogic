'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { mapApiTripToUiTrip, Trip, UiTrip } from '@/hooks/trips/mappers';
import { formatDateStart, formatDateEnd } from '@/utils/datetime';
import { api } from '@/lib/api';

export type ClientTripsFilters = {
  status?: string;
  deliveryType?: string;
  dateRange?: { from?: Date; to?: Date };
  searchTerm?: string;
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

export function useClientTrips() {
  const authorizedRequest = useAuthorizedRequest();

  const [trips, setTrips] = useState<UiTrip[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<ClientTripsFilters>({});

  const fetchClientTrips = useCallback(async () => {
    setLoading(true);

    try {
      await authorizedRequest(async (token) => {
        const params = new URLSearchParams({
          ...(filters.status &&
            filters.status !== 'all' && {
              status: filters.status,
            }),
          ...(filters.deliveryType && {
            delivery_type: filters.deliveryType,
          }),
          ...(filters.dateRange?.from && {
            start_date: formatDateStart(filters.dateRange.from),
          }),
          ...(filters.dateRange?.to
            ? { end_date: formatDateEnd(filters.dateRange.to) }
            : filters.dateRange?.from
              ? { end_date: formatDateEnd(filters.dateRange.from) }
              : {}),
        });

        const res = await api.get<Trip[]>(
          `/client/trips/?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const mapped = res.data.map(mapApiTripToUiTrip);

        setTrips(mapped);
      }, 'Failed to fetch client trips');
    } catch {
      toast.error('Failed to fetch client trips');
    } finally {
      setLoading(false);
    }
  }, [authorizedRequest, filters]);

  useEffect(() => {
    fetchClientTrips();
  }, [fetchClientTrips]);

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
        fetchClientTrips();
      } catch (error: any) {
        const msg = error?.response?.data?.detail ?? 'Failed to create trip';

        toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    },
    [authorizedRequest]
  );

  return {
    trips,
    loading,
    filters,
    setFilters,
    refetch: fetchClientTrips,
    createClientTrip,
  };
}
