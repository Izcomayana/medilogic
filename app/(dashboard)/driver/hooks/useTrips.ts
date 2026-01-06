'use client';

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';

export function useDriverTrips() {
  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

  const driverId = user?.user_id;

  const [trip, setTrip] = useState<any | null>(null);
  const [confirmation, setConfirmation] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [confirmationLoading, setConfirmationLoading] = useState(false);

  const fetchTripById = useCallback(
    async (tripId: string) => {
      if (!driverId) return;

      setLoading(true);
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get(
            `/drivers/driver/${driverId}/trips/${tripId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
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

  const fetchTripConfirmation = useCallback(
    async (tripId: string, includeQr = true) => {
      if (!driverId) return;

      setConfirmationLoading(true);
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get(`/drivers/trips/${tripId}/confirmation`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { include_qr: includeQr },
          });

          setConfirmation(res.data);
          return res.data;
        }, 'failed to get trip confirmation');
      } finally {
        setConfirmationLoading(false);
      }
    },
    [driverId, authorizedRequest]
  );

  return {
    trip,
    confirmation,
    loading,
    confirmationLoading,
    fetchTripById,
    fetchTripConfirmation,
  };
}
