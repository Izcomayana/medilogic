'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, FileText, User } from 'lucide-react';
import { CustodyEvent } from '@/app/(dashboard)/driver/hooks/useCoc';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/utils/datetime';
import { Skeleton } from '@/components/ui/skeleton';

const eventTypeLabels: Record<string, string> = {
  pickup_confirmed: 'Pickup Confirmed',
  in_transit: 'In Transit',
  delayed: 'Delayed',
  handed_off: 'Handed Off',
  delivered: 'Delivered',
};

const eventTypeColors: Record<string, string> = {
  pickup_confirmed: 'bg-blue-900 text-blue-200',
  in_transit: 'bg-yellow-900 text-yellow-200',
  delayed: 'bg-red-900 text-red-200',
  handed_off: 'bg-purple-900 text-purple-200',
  delivered: 'bg-green-900 text-green-200',
};

interface CustodyTimelineProps {
  tripEvents: CustodyEvent[];
  loadingEvents?: boolean;
}

export function CustodyTimeline({
  tripEvents,
  loadingEvents,
}: CustodyTimelineProps) {
  // 🩶 1. Show skeleton while loading
  if (loadingEvents) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Custody Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gray-700 border-4 border-gray-800" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                  <Skeleton className="h-3 w-48 bg-gray-700" />
                  <Skeleton className="h-3 w-40 bg-gray-700" />
                  <Skeleton className="h-16 w-full bg-gray-700 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 🩵 2. Handle empty state
  if (tripEvents.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Custody Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-400">
              No custody events logged yet. Select a trip or Click{' '}
              <span className="underline">Log Event</span> to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 💙 3. Render timeline normally
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Custody Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tripEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {index < tripEvents.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-gray-700" />
              )}
              <div className="flex gap-4">
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[11px] font-medium',
                              eventTypeColors[event.eventType] ||
                                'bg-gray-700 text-gray-200'
                            )}
                          >
                            {eventTypeLabels[event.eventType] ||
                              event.eventType}
                          </Badge>
                        </div>

                        {event.signedBy && (
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                            <User className="h-3 w-3 text-gray-500" />
                            Handled by {event.signedBy}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      {formatDateTime(event.timestamp)}
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                    {event.witnessName && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <User className="h-3 w-3 text-gray-500" />
                        Witness: {event.witnessName}
                      </p>
                    )}
                    {event.attachmentUrl && event.attachmentUrl.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {event.attachmentUrl.map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <FileText className="h-3 w-3" />
                            Attachment {i + 1}
                          </a>
                        ))}
                      </div>
                    )}
                    {event.signatureImageUrl && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-1">Signature:</p>
                        <img
                          src={event.signatureImageUrl}
                          alt="Signature"
                          className="h-10 bg-gray-800 border border-gray-600 rounded p-1 object-contain"
                        />
                      </div>
                    )}
                    {event.notes && (
                      <div className="flex items-start gap-2 text-sm text-gray-300 bg-gray-800 p-2 rounded mt-3">
                        <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p>{event.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
