'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { TripsTable } from '@/app/(dashboard)/components/Trips/components/TripsTable';
import { TripsFilters } from '@/app/(dashboard)/components/Trips/components/Filters';
import { useClientTrips } from '../../hooks/useClientTrips';
import { CreateClientTripModal } from './CreateTrips';
import { useProfile } from '@/hooks/useProfile';

export default function Trips() {
  const { user } = useProfile();
  const clientId = user?.user_id || undefined;

  const {
    createdTrips,
    assignedTrips,
    loadingCreated,
    loadingAssigned,
    createdFilters,
    assignedFilters,
    setCreatedFilters,
    setAssignedFilters,
    createClientTrip,
    cancelClientTrip,
  } = useClientTrips(clientId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        <Tabs defaultValue="created" className="w-full">
          <TabsList>
            <TabsTrigger value="created">Created Trips</TabsTrigger>
            <TabsTrigger value="assigned">Assigned Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="created">
            <TripsFilters
              totalCount={createdTrips.length}
              searchTerm={createdFilters.searchTerm || ''}
              setSearchTerm={(val) =>
                setCreatedFilters((prev) => ({ ...prev, searchTerm: val }))
              }
              statusFilter={createdFilters.status || 'all'}
              setStatusFilter={(val) =>
                setCreatedFilters((prev) => ({ ...prev, status: val }))
              }
              dateRange={createdFilters.dateRange}
              setDateRange={(val) =>
                setCreatedFilters((prev) => ({ ...prev, dateRange: val }))
              }
            >
              <CreateClientTripModal createClientTrip={createClientTrip} />
            </TripsFilters>

            <TripsTable
              trips={createdTrips}
              loading={loadingCreated}
              currentPage={1}
              setCurrentPage={() => {}}
              totalPages={1}
              startIndex={0}
              tripsPerPage={10}
              isClientView
              allowCancel
              handleQuickStatusUpdate={cancelClientTrip}
            />
          </TabsContent>

          <TabsContent value="assigned">
            <TripsFilters
              totalCount={assignedTrips.length}
              searchTerm={assignedFilters.searchTerm || ''}
              setSearchTerm={(val) =>
                setAssignedFilters((prev) => ({ ...prev, searchTerm: val }))
              }
              statusFilter={assignedFilters.status || 'all'}
              setStatusFilter={(val) =>
                setAssignedFilters((prev) => ({ ...prev, status: val }))
              }
              dateRange={assignedFilters.dateRange}
              setDateRange={(val) =>
                setAssignedFilters((prev) => ({ ...prev, dateRange: val }))
              }
            />

            <TripsTable
              trips={assignedTrips}
              loading={loadingAssigned}
              currentPage={1}
              setCurrentPage={() => {}}
              totalPages={1}
              startIndex={0}
              tripsPerPage={10}
              isClientView
              handleQuickStatusUpdate={undefined}
              allowCancel={false}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
