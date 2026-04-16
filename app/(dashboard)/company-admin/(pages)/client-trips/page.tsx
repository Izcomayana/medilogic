'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { TripsTable } from '@/app/(dashboard)/components/Trips/components/TripsTable';
import { useAdminClientTrips } from '@/hooks/trips/useAdminClientTrips';
import { BillingLock } from '@/app/(dashboard)/components/BillingLock';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ClientTripsPage() {
  const { trips, clients, selectedClientId, setSelectedClientId, loading } =
    useAdminClientTrips();

  return (
    <BillingLock>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <PageHeader
          title="Client Trips"
          subtitle="Manage waste collection and delivery of any client trips"
        />

        <main className="flex-1 p-6 space-y-6">
          {/* SELECT CLIENT */}
          <div className="max-w-sm">
            <Select
              value={selectedClientId}
              onValueChange={setSelectedClientId}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>

              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
    </BillingLock>
  );
}
