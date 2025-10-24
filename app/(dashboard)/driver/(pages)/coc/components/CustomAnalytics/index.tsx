'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, AlertCircle } from 'lucide-react';
import { useCOC } from '@/app/(dashboard)/driver/hooks/useCoc';

export function CustodyAnalytics({
  analytics,
  tripEvents,
  selectedTrip,
}: ReturnType<typeof useCOC>) {
  const { duration, uniqueHandlers, handlerBreakdown, eventTypes } = analytics;

  return (
    <div className="space-y-4">
      {/* Duration */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400" />
            Custody Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-white">{duration}</p>
          <p className="text-xs text-gray-400 mt-1">From first to last event</p>
        </CardContent>
      </Card>

      {/* Handlers */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            Handlers Involved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-white">{uniqueHandlers}</p>
          <div className="mt-4 space-y-2">
            {handlerBreakdown.map(([handler, count]) => (
              <div key={handler} className="flex items-center justify-between">
                <p className="text-sm text-gray-300">{handler}</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(count / tripEvents.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-green-400" />
            Events Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Events:</span>
              <span className="text-lg font-bold text-white">
                {tripEvents.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Trip ID:</span>
              <span className="text-sm font-mono text-blue-400">
                {selectedTrip}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Status:</span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-900 text-green-200">
                In Progress
              </span>
            </div>
          </div>

          {/* Event Types */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">
              Event Types
            </p>
            <div className="space-y-1">
              {eventTypes.map(({ type, count }) => (
                <div
                  key={type}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">{type}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
