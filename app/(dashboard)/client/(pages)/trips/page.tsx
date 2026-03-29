'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useClientTrips } from '../../hooks/useClientTrips';
import { TripsTable } from '@/app/(dashboard)/company-admin/(pages)/trips/components/TripsTable';

export default function Trips() {
  const { trips, loading, filters, setFilters } = useClientTrips();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        <TripsTable
          trips={trips}
          loading={loading}
          currentPage={1}
          setCurrentPage={() => {}}
          totalPages={1}
          startIndex={0}
          tripsPerPage={10}
          isClientView
        />
      </main>
    </div>
  );
}
