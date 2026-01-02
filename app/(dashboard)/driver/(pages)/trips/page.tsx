'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Calendar,
  MapPin,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

// Mock data for driver trips
const MOCK_TRIPS = [
  {
    id: 'TRIP-001',
    client_name: 'Acme Corp',
    pickup: '123 Industrial Way, Springfield',
    dropoff: '456 Logistic Blvd, Springfield',
    scheduled_time: '2024-05-20 09:00 AM',
    status: 'In Progress',
    delivery_type: 'Standard',
  },
  {
    id: 'TRIP-002',
    client_name: 'Global Industries',
    pickup: '789 Manufacturing Dr, Metro City',
    dropoff: '101 Distribution Ln, Metro City',
    scheduled_time: '2024-05-20 01:30 PM',
    status: 'Pending',
    delivery_type: 'Express',
  },
  {
    id: 'TRIP-003',
    client_name: 'Tech Solutions',
    pickup: '555 Innovation Pkwy, Tech Valley',
    dropoff: '777 Data Center Rd, Tech Valley',
    scheduled_time: '2024-05-19 10:00 AM',
    status: 'Delivered',
    delivery_type: 'Standard',
  },
];

function TripsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get('status') || 'all'
  );

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const filteredTrips = MOCK_TRIPS.filter((trip) => {
    const matchesSearch =
      trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.client_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      trip.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      <PageHeader
        title="My Trips"
        subtitle="Manage and track your assigned deliveries"
      />

      <div className="flex justify-end py-4">
        <Button
          variant="outline"
          className="text-gray-300 border-gray-700 hover:bg-gray-800 bg-transparent"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Trip ID or Client..."
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilters('q', e.target.value);
            }}
          />
        </div>
        <div className="flex gap-4">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              updateFilters('status', value);
            }}
          >
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="text-gray-300 border-gray-700 hover:bg-gray-800 bg-transparent"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Trips List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">Trip ID</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Pickup → Dropoff</th>
                <th className="px-6 py-4 font-medium">Scheduled Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="hover:bg-gray-750/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {trip.id}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {trip.client_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300 truncate max-w-[200px]">
                        {trip.pickup}
                      </span>
                      <span className="text-xs text-gray-500">to</span>
                      <span className="text-sm text-gray-300 truncate max-w-[200px]">
                        {trip.dropoff}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {trip.scheduled_time}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={
                        trip.status === 'Delivered'
                          ? 'bg-green-900/50 text-green-400 border-green-800'
                          : trip.status === 'In Progress'
                            ? 'bg-blue-900/50 text-blue-400 border-blue-800'
                            : 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      asChild
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      <Link href={`/driver/trips/${trip.id}`}>
                        View Trip
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden divide-y divide-gray-700">
          {filteredTrips.map((trip) => (
            <Link
              key={trip.id}
              href={`/driver/trips/${trip.id}`}
              className="block p-4 hover:bg-gray-750"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white">{trip.id}</span>
                <Badge
                  variant="outline"
                  className={
                    trip.status === 'Delivered'
                      ? 'bg-green-900/50 text-green-400 border-green-800'
                      : trip.status === 'In Progress'
                        ? 'bg-blue-900/50 text-blue-400 border-blue-800'
                        : 'bg-yellow-900/50 text-yellow-400 border-yellow-800'
                  }
                >
                  {trip.status}
                </Badge>
              </div>
              <p className="text-gray-300 font-medium mb-1">
                {trip.client_name}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">
                  {trip.pickup} → {trip.dropoff}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {trip.scheduled_time}
              </div>
            </Link>
          ))}
        </div>

        {filteredTrips.length === 0 && (
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
  );
}

export default function DriverTripsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-1 overflow-auto">
        <Suspense
          fallback={<div className="p-8 text-white">Loading trips...</div>}
        >
          <TripsContent />
        </Suspense>
      </main>
    </div>
  );
}
