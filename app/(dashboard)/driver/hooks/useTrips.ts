'use client';

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';

export function useDriverTrips() {
  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

  const driverId = user?.user_id;

  console.log('driverId:', driverId);

  const [trip, setTrip] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTripById = useCallback(
    async (tripId: string) => {
      if (!driverId) return;

      setLoading(true);

      try {
        await authorizedRequest(async (token) => {
          const res = await api.get(
            `/drivers/driver/${driverId}/trips/${tripId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setTrip(res.data);
          return res.data;
        }, 'failed to get trip details');
      } finally {
        setLoading(false);
      }
    },

    [driverId, authorizedRequest]
  );

  return {
    trip,
    loading,
    fetchTripById,
  };
}
