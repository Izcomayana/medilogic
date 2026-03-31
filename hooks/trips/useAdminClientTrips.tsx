'use client';

import { useEffect, useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { mapApiTripToUiTrip, UiTrip } from '@/hooks/trips/mappers';
import { api } from '@/lib/api';

type ApiTrip = {
  id: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
  delivery_type: string;
  pickup_location: string;
  dropoff_location: string;
  priority: string;
  scheduled_time: string;
  created_at: string;
};

type Client = {
  id: string;
  name: string;
};

function adaptAdminTripToFullTrip(trip: ApiTrip): any {
  return {
    id: trip.id,
    trip_id: trip.id,

    driver_id: null,
    driver_name: null,

    delivery_type: trip.delivery_type,
    // custom_delivery_description: trip.custom_delivery_description || '',

    pickup_location: trip.pickup_location,
    dropoff_location: trip.dropoff_location,

    priority: trip.priority,

    scheduled_time: trip.scheduled_time,
    created_at: trip.created_at,

    status: 'pending', // fallback (admin endpoint doesn't include it)

    vehicle_type: null,
    distance_km: 0,
    cost: null,
    compliance_flag: false,
    shift_window: null,
    recurrence_rule: null,
    notes: null,
  };
}

export function useAdminClientTrips() {
  const authorizedRequest = useAuthorizedRequest();

  const [trips, setTrips] = useState<UiTrip[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoading(true);

      await authorizedRequest(async (token) => {
        const res = await api.get<ApiTrip[]>('/client/trips/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mapped = res.data.map((trip) => {
          const adapted = adaptAdminTripToFullTrip(trip);

          const ui = mapApiTripToUiTrip(adapted);

          return {
            ...ui,
            clientId: trip.client.id,
            clientName: trip.client.name,
          };
        });

        setTrips(mapped);

        // extract unique clients
        const uniqueClients = Array.from(
          new Map(res.data.map((t) => [t.client.id, t.client])).values()
        ).map((c) => ({
          id: c.id,
          name: c.name,
        }));

        setClients(uniqueClients);

        // auto select first client
        if (uniqueClients.length && !selectedClientId) {
          setSelectedClientId(uniqueClients[0].id);
        }
      }, 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(
    (trip: any) => trip.clientId === selectedClientId
  );

  return {
    trips: filteredTrips,
    clients,
    selectedClientId,
    setSelectedClientId,
    loading,
  };
}
