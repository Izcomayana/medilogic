'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDriverTrips } from '../../../hooks/useTrips';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { formatDeliveryType, getTripStatusBadge } from '@/utils/badge';
import {
  ArrowLeft,
  Clock,
  Building2,
  QrCode,
  Share2,
  Copy,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utils/datetime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK_TRIP_DETAILS = {
  id: 'TRIP-001',
  status: 'In Progress',
  client_name: 'Acme Corp',
  driver_name: 'John Doe',
  delivery_type: 'Standard',
  scheduled_time: '2024-05-20 09:00 AM',
  wtn_code: 'WTN-12345',
  pickup: {
    address: '123 Industrial Way, Springfield, IL 62704',
    scheduled_time: '2024-05-20 08:30 AM',
    actual_time: '2024-05-20 08:45 AM',
  },
  dropoff: {
    address: '456 Logistic Blvd, Springfield, IL 62705',
    facility: 'Distribution Hub A',
    scheduled_time: '2024-05-20 10:30 AM',
    actual_time: null,
  },
  delivered: false,
  pin_required: true,
  organization: 'Springfield Logistics',
  created_at: '2024-05-18 02:15 PM',
};

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const router = useRouter();
  const { trip, fetchTripById, confirmation, fetchTripConfirmation } =
    useDriverTrips();

  console.log('confirm:', confirmation);

  const { user } = useProfile();
  const driverId = user?.user_id;
  const org = user?.organization.name;

  useEffect(() => {
    if (!tripId || !driverId) return;

    fetchTripById(tripId);
    fetchTripConfirmation(tripId);
  }, [tripId, driverId, fetchTripById]);

  const isDelivered = confirmation?.status !== 'pending';

  const qrSrc = confirmation?.qr_code_base64
    ? `data:image/png;base64,${confirmation.qr_code_base64}`
    : null;

  if (!trip) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center text-gray-400">
        Loading trip…
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/driver/trips')}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  Trip #{tripId}
                </h1>
                {getTripStatusBadge(trip.status)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Info Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="border-b border-gray-700">
                  <CardTitle className="text-lg font-semibold">
                    Trip Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Building2 className="h-3 w-3" /> Client
                      </p>
                      <p className="font-medium">{trip.client_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Delivery Type</p>
                      <p className="font-medium">
                        {formatDeliveryType(trip.delivery_type)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Scheduled Time</p>
                      <p className="font-medium">
                        {formatDateTime(trip.scheduled_time)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">ID</p>
                      <p className="font-medium text-blue-400">
                        {trip.trip_id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Locations Section */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="border-b border-gray-700">
                  <CardTitle className="text-lg font-semibold">
                    Route Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8 relative">
                    {/* Vertical line connecting pickups */}
                    <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gray-700"></div>

                    {/* Pickup */}
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center z-10">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                            Pickup
                          </p>
                          <p className="font-medium mb-1">
                            {trip.pickup_location}
                          </p>
                          <div className="flex items-center text-sm text-gray-400 gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            Scheduled: {formatDateTime(trip.scheduled_time)}
                          </div>
                        </div>
                        {MOCK_TRIP_DETAILS.pickup.actual_time && (
                          <Badge
                            variant="outline"
                            className="bg-green-900/20 text-green-400 border-green-900"
                          >
                            Arrived{' '}
                            {MOCK_TRIP_DETAILS.pickup.actual_time.split(' ')[1]}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Dropoff */}
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center z-10">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                            Dropoff
                          </p>
                          <p className="font-medium mb-1">
                            {trip.dropoff_location}
                          </p>
                          <div className="flex items-center text-sm text-gray-400 gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            Scheduled: {formatDateTime(trip.scheduled_time)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Status Section */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="border-b border-gray-700">
                  <CardTitle className="text-lg font-semibold">
                    Delivery Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-500 mb-1 uppercase font-bold">
                        Delivered
                      </p>
                      <p
                        className={`text-lg font-bold ${trip.is_delivered ? 'text-green-400' : 'text-gray-400'}`}
                      >
                        {trip.is_delivered ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-500 mb-1 uppercase font-bold">
                        PIN Required
                      </p>
                      <p className="text-lg font-bold text-white">
                        {trip.requires_pin || trip.pin_required ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {/* <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-500 mb-1 uppercase font-bold">
                        Pickup Time
                      </p>
                      <p className="text-sm font-medium text-white">
                        {confirmation.pickup_at
                          ? confirmation.pickup_at.split(' ')[1]
                          : '--:--'}
                      </p>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Confirmation Section */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 text-white border-2 border-blue-500/50">
                <CardHeader className="border-b border-gray-700 bg-blue-500/10 py-4 !pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-blue-400" />
                    Confirmation
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  {!confirmation ? (
                    <p className="text-sm text-gray-400 text-center">
                      Loading confirmation…
                    </p>
                  ) : isDelivered ? (
                    /* ✅ CONFIRMED */
                    <div className="text-center py-8">
                      <div className="h-16 w-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        Delivery Confirmed
                      </h3>

                      <p className="text-gray-400 text-sm mb-6">
                        This trip has been successfully confirmed by the client.
                      </p>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                        View Receipt
                      </Button>
                    </div>
                  ) : (
                    /* ⏳ PENDING */
                    <div className="space-y-6">
                      {/* QR */}
                      <div className="bg-white p-4 rounded-xl aspect-square flex items-center justify-center mx-auto max-w-[240px]">
                        {qrSrc ? (
                          <img
                            src={qrSrc}
                            alt="Trip confirmation QR"
                            className="h-40 w-40"
                          />
                        ) : (
                          <QrCode className="h-40 w-40 text-black" />
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <p className="text-sm text-gray-400 text-center px-4">
                          Share this QR code or link with the client to confirm
                          delivery.
                        </p>

                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-none"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                confirmation.confirmation_url
                              );
                              toast.success('Confirmation link copied');
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </Button>

                          <Button
                            variant="secondary"
                            className="bg-gray-700 hover:bg-gray-600 text-white border-none"
                            onClick={() =>
                              window.open(
                                confirmation.confirmation_url,
                                '_blank'
                              )
                            }
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Expiry */}
                      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 border-dashed">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">
                          Token Expiry
                        </p>
                        <p className="text-xs text-yellow-500 font-medium">
                          Expires at{' '}
                          {new Date(
                            confirmation.token_expires_at
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audit Metadata */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Organization</span>
                  <span className="text-gray-300">{org}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Created At</span>
                  <span className="text-gray-300">
                    {formatDateTime(trip.created_at)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Internal Notes
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    {trip.notes?.trim()
                      ? trip.notes
                      : 'No notes attached to this trip.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
