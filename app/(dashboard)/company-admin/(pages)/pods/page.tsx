'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';
import { usePods } from '@/app/(dashboard)/driver/hooks/usePODs';
import { PodsTable } from '@/app/(dashboard)/driver/(pages)/pods/components/PODsTable';
import {
  ViewPOD,
  ViewPODFile,
} from '@/app/(dashboard)/driver/(pages)/pods/components/Modals';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';
import { useDrivers } from '../trips/components/CreateTrip/TripForm/useDrivers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProofOfDeliveriesPage() {
  const podState = usePods();
  const { drivers, loading } = useDrivers();

  const {
    dateFilter,
    setDateFilter,
    driverFilter,
    setDriverFilter,
    filteredPods,
  } = podState;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <PageHeader
          title="Proof of Deliveries"
          subtitle="Manage and upload delivery confirmations"
        />

        <main className="flex-1 p-6">
          {/* Filters and Controls */}
          <Card className="dashboard-card mb-6">
            <CardHeader className="flex flex-col md:flex-row justify-between md:items-center ">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PODs Management ({filteredPods.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <DateRangeFilter value={dateFilter} onChange={setDateFilter} />

                <div>
                  <Select
                    value={driverFilter ?? 'all'}
                    onValueChange={(value) =>
                      setDriverFilter(value === 'all' ? null : value)
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                      <SelectValue
                        placeholder={
                          loading ? 'Loading drivers...' : 'Select driver'
                        }
                      />
                    </SelectTrigger>

                    <SelectContent className="bg-gray-700 border-gray-600">
                      {/* Always include "All Drivers" */}
                      <SelectItem value="all">All Drivers</SelectItem>

                      {loading ? (
                        // 👇 show loading skeleton or text while fetching
                        <div className="text-gray-400 text-sm p-2 italic">
                          Loading drivers...
                        </div>
                      ) : drivers.length > 0 ? (
                        // 👇 show list when loaded
                        drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))
                      ) : (
                        // 👇 fallback if none found
                        <div className="text-gray-400 text-sm p-2 italic">
                          No drivers found <br /> kindly register a driver
                          first.
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <PodsTable {...podState} />
        </main>
      </div>

      <ViewPOD {...podState} />

      <ViewPODFile {...podState} />
    </>
  );
}
