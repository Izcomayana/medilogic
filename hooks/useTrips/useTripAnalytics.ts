/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';

export interface TripAnalyticsFilters {
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  driver_id?: string | null;
  client_name?: string | null;
  delivery_type?: string | null;
}

export interface TripAnalyticsResponse {
  filters_applied: TripAnalyticsFilters;
  analytics: {
    total_trips: number;
    total_distance_km: number;
    total_cost: number;
    average_cost: number;
    most_common_delivery_type: string | null;
  };
  ai_prediction: {
    predicted_durations_minutes: number[];
    average_predicted_duration: number;
  };
  ai_insight: string;
  chart: string;
}

export function useTripAnalytics(filters: TripAnalyticsFilters = {}) {
  const [data, setData] = useState<TripAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authorizedRequest = useAuthorizedRequest();

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, v]) => v !== null && v !== undefined
        )
      );

      authorizedRequest(async (validToken) => {
        const res = await axios.get<TripAnalyticsResponse>(
          `https://medilogic-backend.onrender.com/analytics/trips/analytics`,
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
            },
            params,
          }
        );
        setData(res.data);
      }, 'Falied to get trips analytics');
    } catch (err: any) {
      console.error('Failed to fetch trip analytics:', err);
      setError(err.response?.data?.detail || 'Failed to fetch trip analytics');
      toast.error('Failed to fetch trip analytics');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
