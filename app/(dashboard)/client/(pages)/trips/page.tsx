'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useClientTrips } from '../../hooks/useClientTrips';
import { TripsTable } from '@/app/(dashboard)/components/Trips/components/TripsTable';
import { TripsFilters } from '@/app/(dashboard)/components/Trips/components/Filters';
import { CreateClientTripModal } from './CreateTrips';

export default function Trips() {
  const { trips, loading, filters, setFilters, createClientTrip } =
    useClientTrips();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        <TripsFilters
          totalCount={trips.length}
          searchTerm={filters.searchTerm || ''}
          setSearchTerm={(val) =>
            setFilters((prev) => ({ ...prev, searchTerm: val }))
          }
          statusFilter={filters.status || 'all'}
          setStatusFilter={(val) =>
            setFilters((prev) => ({ ...prev, status: val }))
          }
          dateRange={filters.dateRange}
          setDateRange={(val) =>
            setFilters((prev) => ({ ...prev, dateRange: val }))
          }
        >
          <CreateClientTripModal createClientTrip={createClientTrip} />
        </TripsFilters>

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
