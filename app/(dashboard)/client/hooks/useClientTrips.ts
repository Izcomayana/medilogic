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

  return {
    trips,
    loading,
    filters,
    setFilters,
    refetch: fetchClientTrips,
  };
}
