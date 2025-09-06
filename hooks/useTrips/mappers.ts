export type Trip = {
  driver_id: string;
  driver_name: string | null;
  delivery_type: string;
  scheduled_time: string | null;
  cost: number | null;
  client_name: string | null;
  organization_id: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  distance_km: number | null;
  status: string | null;
  vehicle_type: string | null;
  location_zone: string | null;
  shift_window: string | null;
  compliance_flag: boolean | null;
  recurrence_rule: string | null;
  priority: string | null;
  custom_delivery_description: string | null;
  id: string;
  created_at: string;
};

export function mapApiTripToUiTrip(apiTrip: Trip) {
  return {
    id: apiTrip.id,
    clientOrganization: apiTrip.client_name,
    deliveryType: apiTrip.delivery_type,
    pickupLocation: apiTrip.pickup_location,
    dropoffLocation: apiTrip.dropoff_location,
    driverId: apiTrip.driver_id,
    driverAssigned: apiTrip.driver_name,
    status: apiTrip.status,
    priority: apiTrip.priority,
    dateTime: apiTrip.scheduled_time,
    // notes: apiTrip.custom_delivery_description,
    createdDate: apiTrip.created_at,
    statusHistory: [
      {
        status: apiTrip.status,
        timestamp: apiTrip.created_at,
        note: apiTrip.custom_delivery_description || '',
      },
    ],
  };
}

export type UiTrip = ReturnType<typeof mapApiTripToUiTrip>;
