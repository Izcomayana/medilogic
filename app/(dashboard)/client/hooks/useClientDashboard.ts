'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { formatDateStart, formatDateEnd } from '@/utils/datetime';
import { api } from '@/lib/api';

export type ClientDashboardFilters = {
  status?: string;
  deliveryType?: string;
  dateRange?: { from?: Date; to?: Date };
};

export function useClientDashboard(clientId: string) {
  const authorizedRequest = useAuthorizedRequest();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<ClientDashboardFilters>({});

  const fetchDashboard = useCallback(async () => {
    if (!clientId) return;

    setLoading(true);

    try {
      await authorizedRequest(async (token) => {
        const params = new URLSearchParams({
          ...(filters.status &&
            filters.status !== 'all' && { status: filters.status }),
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

        const res = await api.get(
          `/dashboard/dashboard/client/${clientId}?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setData(res.data);
      }, 'Failed to fetch dashboard');
    } catch {
      toast.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  }, [authorizedRequest, clientId, filters]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    filters,
    setFilters,
    refetch: fetchDashboard,
  };
}
