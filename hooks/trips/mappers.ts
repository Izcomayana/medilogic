import { formatDateTime } from '@/utils/datetime';

export type Trip = {
  driver_id: string;
  driver_name: string | null;
  delivery_type: string;
  scheduled_time: string | null;
  cost: string | null;
  client_name: string | null;
  client_id: string;
  organization_id: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  distance_km: string | null;
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
  notes: string;
};

export function mapApiTripToUiTrip(apiTrip: Trip) {
  return {
    id: apiTrip.id,
    clientName: apiTrip.client_name,
    clientId: apiTrip.client_id,
    deliveryType: apiTrip.delivery_type,
    organizationId: apiTrip.organization_id,
    pickupLocation: apiTrip.pickup_location,
    dropoffLocation: apiTrip.dropoff_location,
    driverId: apiTrip.driver_id,
    driverName: apiTrip.driver_name,
    status: apiTrip.status,
    priority: apiTrip.priority,
    dateTime: formatDateTime(apiTrip.scheduled_time || '-'),
    vehicleType: apiTrip.vehicle_type,
    shiftWindow: apiTrip.shift_window,
    cost: apiTrip.cost,
    distance: apiTrip.distance_km,
    locationZone: apiTrip.location_zone,
    complianceFlag: apiTrip.compliance_flag,
    recurrenceRule: apiTrip.recurrence_rule,
    notes: apiTrip.notes,
    createdDate: apiTrip.created_at,
    customDeliveryDescription: apiTrip.custom_delivery_description,
    statusHistory: [
      {
        status: apiTrip.status,
        timestamp: apiTrip.created_at,
        note: apiTrip.notes || '',
      },
    ],
  };
}

export type UiTrip = ReturnType<typeof mapApiTripToUiTrip>;
