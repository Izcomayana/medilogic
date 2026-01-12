'use client';

import { Suspense } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { usePods } from '../../hooks/usePODs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/utils/datetime';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';
import { formatDeliveryType, getTripStatusBadge } from '@/utils/badge';

export default function DriverTripsPage() {
  const { driverTrips, setStatus, dateRange, setDateRange } = usePods();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-1 overflow-auto">
        <Suspense
          fallback={<div className="p-8 text-white">Loading trips...</div>}
        >
          <div className="p-4">
            <PageHeader
              title="My Trips"
              subtitle="Manage and track your assigned deliveries"
            />

            {/* Filters Bar */}
            <div className="flex gap-3 my-4">
              <Select
                value={status ?? 'all'}
                onValueChange={(value) =>
                  setStatus(value === 'all' ? undefined : value)
                }
              >
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>

                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Date range filter */}
              <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </div>

            {/* Trips List */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="hidden md:block">
                <Table className="w-full text-left">
                  <TableHeader>
                    <TableRow className="border-b border-gray-700 text-gray-400 text-sm">
                      <TableHead className="text-gray-200 px-6 py-4 font-medium">
                        Client
                      </TableHead>
                      <TableHead className="text-gray-200 px-6 py-4 font-medium">
                        Type
                      </TableHead>
                      <TableHead className="text-gray-200 px-6 py-4 font-medium">
                        Scheduled Time
                      </TableHead>
                      <TableHead className="text-gray-200 px-6 py-4 font-medium">
                        Status
                      </TableHead>
                      <TableHead className="text-gray-200 px-6 py-4 font-medium text-center">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-700">
                    {driverTrips.map((trip) => (
                      <TableRow
                        key={trip.id}
                        className="hover:bg-gray-750/50 transition-colors"
                      >
                        <TableCell className="px-6 py-4 text-gray-300">
                          {trip.client_name}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-300">
                          {formatDeliveryType(
                            trip.delivery_type,
                            trip.custom_delivery_description
                          )}
                        </TableCell>

                        <TableCell className="px-6 py-4 text-gray-300 text-sm">
                          {formatDateTime(trip.scheduled_time)}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {getTripStatusBadge(trip.status)}
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <Button
                            asChild
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            <Link href={`/driver/trips/${trip.trip_id}`}>
                              View Trip
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View - Cards */}
              <div className="md:hidden divide-y divide-gray-700">
                {driverTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/driver/trips/${trip.trip_id}`}
                    className="block p-4 hover:bg-gray-750"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white">
                        {trip.client_name}
                      </span>
                      {getTripStatusBadge(trip.status)}
                    </div>
                    <p className="text-gray-300 font-medium mb-1">
                      {formatDeliveryType(trip)}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <div className="truncate">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {trip.pickup_location}
                          </span>
                        </div>

                        <div className="mt-1">→ {trip.dropoff_location}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDateTime(trip.scheduled_time)}
                    </div>
                  </Link>
                ))}
              </div>

              {driverTrips.length === 0 && (
                <div className="p-12 text-center">
                  <div className="bg-gray-700 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-white font-medium">No trips assigned</h3>
                  <p className="text-gray-400 mt-1">
                    Try adjusting your filters or contact dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
