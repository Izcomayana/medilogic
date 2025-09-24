// tripAnalytics/mappers.ts
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
    trips_per_delivery_type?: Record<string, number>;
  };
  ai_prediction: {
    predicted_durations_minutes: number[];
    average_predicted_duration: number;
  };

  // ai_prediction: {
  //   average_predicted_duration: number;
  //   min_predicted_duration: number;
  //   max_predicted_duration: number;
  // };
  ai_insight: string;
  chart?: string; // optional backend chart HTML
}

// Mapped UI type
export function mapApiTripAnalyticsToUi(api: TripAnalyticsResponse) {
  return {
    totalTrips: api.analytics.total_trips,
    totalDistance: api.analytics.total_distance_km,
    totalCost: api.analytics.total_cost,
    averageCost: api.analytics.average_cost,
    mostCommonDeliveryType: api.analytics.most_common_delivery_type,
    tripsPerDeliveryType: api.analytics.trips_per_delivery_type ?? {},
    aiPrediction: api.ai_prediction,
    aiInsight: api.ai_insight,
    chart: api.chart ?? null,
    filtersApplied: api.filters_applied,
  };
}

export type UiTripAnalytics = ReturnType<typeof mapApiTripAnalyticsToUi>;
