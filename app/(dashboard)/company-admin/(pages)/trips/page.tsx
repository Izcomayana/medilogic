'use client';

import { useTrips } from '@/hooks/trips/useTrips';
import { TripsFilters } from '../../../components/Trips/components/Filters';
import { TripsTable } from '../../../components/Trips/components/TripsTable';
import { EditTripModal } from './components/EditTrips';
import { TripsDetailModal } from './components/TripDetail';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { CreateTrips } from './components/CreateTrip';

export default function TripsPage() {
  const tripState = useTrips();

  const {
    filteredTrips,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    tripsPerPage,
    handleViewDetails,
    handleEdit,
    handleQuickStatusUpdate,
    handleDeleteTrip,
  } = tripState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <TripsFilters
          totalCount={tripState.filteredTrips.length}
          searchTerm={tripState.searchTerm}
          setSearchTerm={tripState.setSearchTerm}
          statusFilter={tripState.statusFilter}
          setStatusFilter={tripState.setStatusFilter}
          dateRange={tripState.dateRange}
          setDateRange={tripState.setDateRange}
        >
          <CreateTrips {...tripState} />
        </TripsFilters>

        {/* Trips Table */}
        <TripsTable
          trips={filteredTrips}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          tripsPerPage={tripsPerPage}
          handleViewDetails={handleViewDetails}
          handleEdit={handleEdit}
          handleQuickStatusUpdate={handleQuickStatusUpdate}
          handleDeleteTrip={handleDeleteTrip}
        />
      </main>

      {/* Trip Details Modal */}
      <TripsDetailModal {...tripState} />

      {/* Edit Trip Modal */}
      <EditTripModal {...tripState} />
    </div>
  );
}
