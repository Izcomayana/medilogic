// tripAnalytics/api.ts
import axios from 'axios';
import { TripAnalyticsFilters, TripAnalyticsResponse } from './mappers';
import { formatDateStartUtc, formatDateEndUtc } from '@/utils/datetime';

export async function fetchTripAnalyticsRequest(
  token: string,
  filters: TripAnalyticsFilters
) {
  const res = await axios.get<TripAnalyticsResponse>(
    'https://medilogic-backend.onrender.com/analytics/trips/analytics',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        driver_id: filters.driver_id || undefined,
        delivery_type: filters.delivery_type || undefined,
        client_name: filters.client_name || undefined,
        status: filters.status || undefined,
        start_date: filters.start_date
          ? formatDateStartUtc(new Date(filters.start_date))
          : undefined,
        end_date: filters.end_date
          ? formatDateEndUtc(new Date(filters.end_date))
          : undefined,
      },
    }
  );

  return res.data;
}
