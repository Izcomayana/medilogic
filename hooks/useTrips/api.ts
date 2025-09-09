import axios from 'axios';
import { mapApiTripToUiTrip, Trip, UiTrip } from './mappers';
import { formatDateStart, formatDateEnd } from './utils';

export async function fetchTripsRequest(
  token: string,
  {
    statusFilter,
    searchTerm,
    dateRange,
    currentPage,
    tripsPerPage,
  }: {
    statusFilter: string;
    searchTerm: string;
    dateRange?: { from?: Date; to?: Date };
    currentPage: number;
    tripsPerPage: number;
  }
) {
  const res = await axios.get('https://medilogic-backend.onrender.com/trips', {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      status: statusFilter !== 'all' ? statusFilter : undefined,
      driver_name: searchTerm || undefined,
      client_name: searchTerm || undefined,
      skip: (currentPage - 1) * tripsPerPage,
      limit: tripsPerPage,
      from_date: dateRange?.from ? formatDateStart(dateRange.from) : undefined,
      to_date: dateRange?.to
        ? formatDateEnd(dateRange.to)
        : dateRange?.from
          ? formatDateEnd(dateRange.from)
          : undefined,
      sort_by: 'scheduled_time',
      sort_order: 'asc',
    },
  });

  return res.data;
}

export async function fetchTripByIdRequest(token: string, tripId: string) {
  const res = await axios.get(
    `https://medilogic-backend.onrender.com/trips/${tripId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function createTripRequest(token: string, payload: Partial<Trip>) {
  const res = await axios.post<Trip>(
    'https://medilogic-backend.onrender.com/trips/',
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function deleteTripRequest(token: string, tripId: string) {
  try {
    const res = await axios.delete(
      `https://medilogic-backend.onrender.com/trips/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status === 200 || res.status === 204;
  } catch (error: any) {
    // Axios wraps errors → check response details
    const status = error.response?.status;
    const message = error.response?.data?.detail || error.message;
    throw new Error(`Failed to delete trip: ${status} ${message}`);
  }
}

export async function partialUpdateTripRequest(
  token: string,
  tripId: string,
  payload: Partial<Trip>
) {
  const res = await axios.patch<Trip>(
    `https://medilogic-backend.onrender.com/trips/trips/${tripId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function updateTripRequest(
  token: string,
  tripId: string,
  payload: Partial<Trip>
) {
  const res = await axios.put<Trip>(
    `https://medilogic-backend.onrender.com/trips/trips/${tripId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
