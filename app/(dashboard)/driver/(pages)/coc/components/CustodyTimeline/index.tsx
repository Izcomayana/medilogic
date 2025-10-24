'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, FileText, User } from 'lucide-react';
import { CustodyEvent } from '@/app/(dashboard)/driver/hooks/useCoc';

interface CustodyTimelineProps {
  tripEvents: CustodyEvent[];
}

export function CustodyTimeline({ tripEvents }: CustodyTimelineProps) {
  if (tripEvents.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Custody Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-400">
              No custody events logged yet. Click "Log Event" to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {event.eventType}
                        </h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <User className="h-3 w-3" />
                          {event.handler}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-200">
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      {event.timestamp}
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
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
