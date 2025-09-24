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
import {
  formatDateEnd,
  formatDateStart,
} from '../../app/(dashboard)/company-admin/(pages)/trips/components/Filters/dateRange';

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
              ? formatDateStart(dateRange.from)
              : undefined,
            end_date: dateRange?.to ? formatDateEnd(dateRange.to) : undefined,
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
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  // 1. Predicted Durations → BarChart
  const predictedDurationData =
    analytics?.aiPrediction?.predicted_durations_minutes.map((d, i) => ({
      trip: `Trip ${i + 1}`,
      duration: d,
    })) || [];

  // 2. Delivery Type Distribution → PieChart
  // NOTE: Backend only gives `most_common_delivery_type`,
  // so unless API changes, you might need to calculate distribution
  // from trips endpoint instead. For now, let’s mock it:
  const deliveryTypeData = [
    { name: analytics?.mostCommonDeliveryType || 'Unknown', value: 1 },
  ];

  // 3. Cost vs Distance → LineChart
  // Same thing: backend only gives totals, not per-trip pairs.
  // For demo, I’ll fabricate from totals until API adds breakdown.
  const costDistanceData = [
    {
      distance: analytics?.totalDistance || 0,
      cost: analytics?.totalCost || 0,
    },
  ];

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
    predictedDurationData,
    deliveryTypeData,
    costDistanceData,
    getFiltersAppliedText,
  };
}
