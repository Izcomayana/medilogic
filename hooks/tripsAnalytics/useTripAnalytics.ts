'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import {
  TripAnalyticsFilters,
  UiTripAnalytics,
  mapApiTripAnalyticsToUi,
} from './mappers';
import { fetchTripAnalyticsRequest } from './api';
import { formatDateStartUtc, formatDateEndUtc } from '@/utils/datetime';
// import { formatDateLocal } from '../utils';

export type DateRangeLocal = { from?: Date; to?: Date };

export function useTripAnalytics(initialFilters: TripAnalyticsFilters = {}) {
  const [analytics, setAnalytics] = useState<UiTripAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState<DateRangeLocal>();
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('all');

  const authorizedRequest = useAuthorizedRequest();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await authorizedRequest(
        (token) =>
          fetchTripAnalyticsRequest(token, {
            ...initialFilters,
            driver_id: selectedDriver !== 'all' ? selectedDriver : null,
            status: status != 'all' ? status : null,
            delivery_type:
              selectedDeliveryType !== 'all' ? selectedDeliveryType : null,
            start_date: dateRange?.from
              ? formatDateStartUtc(dateRange.from)
              : undefined,
            end_date: dateRange?.to
              ? formatDateEndUtc(dateRange.to)
              : undefined,
          }),
        'Failed to fetch trips analytics'
      );

      if (data) {
        setAnalytics(mapApiTripAnalyticsToUi(data));
      } else {
        setAnalytics(null);
      }
    } catch (err: any) {
      console.error('fetchTripAnalytics error', err);
      setError(err.response?.data?.detail || 'Failed to fetch trip analytics');
      toast.error('Failed to fetch trip analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, selectedDriver, selectedDeliveryType, status]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  // 2. Trips per Delivery Type → Bar & Pie Chart
  // Format delivery types nicely (snake_case → Title Case)
  function formatDeliveryType(type: string) {
    return type
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  const deliveryTypeData = analytics?.tripsPerDeliveryType
    ? Object.entries(analytics.tripsPerDeliveryType).map(([key, value]) => ({
        name: formatDeliveryType(key),
        value,
      }))
    : [];

  const deliveryTypeColors: Record<string, string> = {
    'Clinical Waste': '#ef4444', // red
    Equipment: '#3b82f6', // blue
    Documents: '#10b981', // green (example if added later)
  };

  // 4. Predicted Duration vs Trips → Line Chart
  const predictedDurationData =
    analytics?.aiPrediction.predicted_durations_minutes?.map(
      (duration, index) => ({
        trip: index + 1, // Trip number
        duration,
      })
    ) || [];

  const getFiltersAppliedText = useCallback(() => {
    const filtersText: string[] = [];

    if (dateRange?.from || dateRange?.to) {
      const fromText = dateRange.from
        ? dateRange.from.toLocaleDateString('en-GB')
        : '...';
      const toText = dateRange.to
        ? dateRange.to.toLocaleDateString('en-GB')
        : '...';
      filtersText.push(`Date: ${fromText} → ${toText}`);
    }

    if (status !== 'all') {
      filtersText.push(`Status: ${status}`);
    }

    if (selectedDriver !== 'all') {
      filtersText.push(`Driver: ${selectedDriver}`);
    }

    if (selectedDeliveryType !== 'all') {
      filtersText.push(`Type: ${selectedDeliveryType}`);
    }

    return filtersText.length > 0
      ? `Filters applied → ${filtersText.join(', ')}`
      : 'Filters: None applied (showing all trips)';
  }, [dateRange, status, selectedDriver, selectedDeliveryType]);

  return {
    analytics,
    loading,
    error,
    dateRange,
    setDateRange,
    selectedDriver,
    setSelectedDriver,
    selectedDeliveryType,
    setSelectedDeliveryType,
    status,
    setStatus,
    refetch: fetchAnalytics,
    formatCurrency,
    deliveryTypeData,
    deliveryTypeColors,
    predictedDurationData,
    getFiltersAppliedText,
  };
}
