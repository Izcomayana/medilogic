'use client';

import { useTrips } from '@/hooks/trips/useTrips';
import { Filters } from './components/Filters';
import { TripsTable } from './components/TripsTable';
import { EditTripModal } from './components/EditTrips';
import { TripsDetailModal } from './components/TripDetail';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

export default function TripsPage() {
  const tripState = useTrips();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <Filters {...tripState} />

        {/* Trips Table */}
        <TripsTable {...tripState} />
      </main>

      {/* Trip Details Modal */}
      <TripsDetailModal {...tripState} />

      {/* Edit Trip Modal */}
      <EditTripModal {...tripState} />
    </div>
  );
}
