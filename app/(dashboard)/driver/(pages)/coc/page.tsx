'use client';

import { useState } from 'react';
import { Plus, Download, RefreshCw } from 'lucide-react';
// import { DriverSidebar } from "@/components/driver-sidebar"
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

export default function ChainOfCustodyPage() {
  const cocState = useCOC();

  const {
    mockTrips,
    selectedTrip,
    setShowLogModal,
    setSelectedTrip,
    isRefreshing,
    tripEvents,
    handleRefresh,
    selectedTripData,
    handleExport,
  } = cocState;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <PageHeader
        title="Chain of Custody"
        subtitle="Create, view, and manage your delivery proofs"
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Trip Selection & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Trip
              </label>
              <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {mockTrips.map((trip) => (
                    <SelectItem
                      key={trip.id}
                      value={trip.id}
                      className="text-white"
                    >
                      {trip.id} - {trip.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Trip ID
                    </p>
                    <p className="text-lg font-bold text-white">
                      {selectedTripData.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Client
                    </p>
                    <p className="text-lg font-bold text-white">
                      {selectedTripData.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold">
                      Date
                    </p>
                    <p className="text-lg font-bold text-white">
                      {selectedTripData.date}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline Section */}
            <div className="lg:col-span-2">
              <CustodyTimeline {...cocState} />
            </div>

            {/* Analytics Section */}
            <div className="lg:col-span-1">
              {/* <CustodyAnalytics events={tripEvents} tripId={selectedTrip} /> */}
              <CustodyAnalytics {...cocState} />
            </div>
          </div>
        </div>
      </main>

      {/* Log Event Modal */}
      <LogCustodyEventModal {...cocState} />
      {/* <LogCustodyEventModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        onSubmit={handleAddEvent}
        tripId={selectedTrip}
      /> */}
    </div>
  );
}
