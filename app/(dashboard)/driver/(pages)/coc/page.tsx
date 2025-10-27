'use client';

import { Plus, Download, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogCustodyEventModal } from './components/LogCustody';
import { CustodyTimeline } from './components/CustodyTimeline';
import { CustodyAnalytics } from './components/CustomAnalytics';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useCOC } from '../../hooks/useCoc';
import { formatDateTime } from '@/utils/datetime';
import { CustodyTimelineChart } from './components/CustodyChart';

export default function ChainOfCustodyPage() {
  const cocState = useCOC();

  const {
    selectedTrip,
    setShowLogModal,
    setSelectedTrip,
    isRefreshing,
    tripEvents,
    handleRefresh,
    selectedTripData,
    handleExport,
    loadingPods,
    driverTrips,
    loadingEvents,
    loadingAnalytics,
    analyticsData,
    analyticsError,
  } = cocState;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <PageHeader
        title="Chain of Custody"
        subtitle="Track and log custody transfers for your deliveries."
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Trip Selection & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-300 mb-2">
                Select Trip
              </Label>
              <div>
                <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue
                      placeholder={
                        loadingPods ? 'Loading trips...' : 'Select a trip'
                      }
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
                    {loadingPods && driverTrips.length === 0 ? (
                      <div className="text-gray-400 text-sm p-2">
                        Loading trips...
                      </div>
                    ) : driverTrips.length > 0 ? (
                      driverTrips.map((trip) => {
                        const formattedType =
                          trip.delivery_type
                            ?.replaceAll('_', ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                          'Unknown Type';

                        return (
                          <SelectItem key={trip.trip_id} value={trip.trip_id}>
                            {`${trip.client_name || 'Unknown Client'} — ${formattedType}`}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <div className="text-gray-400 text-sm p-2">
                        No trips assigned yet
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 items-end">
              <Button
                onClick={() => setShowLogModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Event
              </Button>

              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem
                    onClick={() => handleExport('csv')}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport('pdf')}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Trip Info Card */}
          {selectedTripData && (
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Client
                    </p>
                    <p className="text-base font-bold text-white">
                      {selectedTripData.client_name || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Type
                    </p>
                    <p className="text-base font-bold text-white">
                      {selectedTripData.delivery_type
                        ?.replaceAll('_', ' ')
                        .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                        'Unknown Type'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Date
                    </p>
                    <p className="text-base font-bold text-white">
                      {formatDateTime(selectedTripData.scheduled_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Events Logged
                    </p>
                    <p className="text-lg font-bold text-blue-400">
                      {tripEvents.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-6">
            {/* Timeline Section */}
            <div className="lg:col-span-2">
              <CustodyTimeline
                tripEvents={tripEvents}
                loadingEvents={loadingEvents}
              />
            </div>

            <CustodyTimelineChart
              data={analyticsData}
              loading={loadingAnalytics}
              error={analyticsError}
            />
            {/* Analytics Section */}
            <div className="lg:col-span-1">
              <CustodyAnalytics {...cocState} />
            </div>
          </div>
        </div>
      </main>

      {/* Log Event Modal */}
      <LogCustodyEventModal {...cocState} />
    </div>
  );
}
