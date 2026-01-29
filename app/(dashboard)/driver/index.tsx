'use client';

import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import DateRangeFilter, {
  DateRangeLocal,
} from '@/app/(dashboard)/components/DateRange';
import { getTripStatusBadge, formatDeliveryType } from '@/utils/badge';
import { formatDateTime } from '@/utils/datetime';

type TripSummary = {
  total_trips: number;
  completed: number;
  in_progress: number;
  cancelled: number;
  on_time_delivery_rate: string;
  most_frequent_client: string;
};

type DriverDashboard = {
  driver_id: string;
  driver_name: string;
  trip_summary: TripSummary;
  upcoming_trips: any[];
  upcoming_shifts: any[];
};

export const Driver = () => {
  const [dashboard, setDashboard] = useState<DriverDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRangeLocal | undefined>();
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState('all');

  const authorizedRequest = useAuthorizedRequest();

  const { user } = useProfile();
  const driverId = user?.user_id;
  console.log('id:', driverId);

  useEffect(() => {
    if (!driverId) return;
    if (dateRange && (!dateRange.from || !dateRange.to)) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        await authorizedRequest(async (token) => {
          const res = await api.get(`/dashboard/dashboard/driver/${driverId}`, {
            params: {
              status: statusFilter === 'all' ? null : statusFilter,
              delivery_type:
                deliveryTypeFilter === 'all' ? null : deliveryTypeFilter,
              start_date: dateRange?.from
                ? dateRange.from.toISOString()
                : undefined,
              end_date: dateRange?.to ? dateRange.to.toISOString() : undefined,
            },
            headers: { Authorization: `Bearer ${token}` },
          });

          setDashboard(res.data);
        }, 'Failed to load driver dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [
    driverId, // 👈 IMPORTANT
    statusFilter,
    deliveryTypeFilter,
    dateRange,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) return null;

  const filteredTrips = dashboard.upcoming_trips.filter((trip) => {
    if (statusFilter !== 'all' && trip.status.toLowerCase() !== statusFilter)
      return false;
    return true;
  });

  const onTimeRate =
    dashboard.trip_summary.on_time_delivery_rate === 'N/A'
      ? null
      : Number(dashboard.trip_summary.on_time_delivery_rate);

  return (
    <div className="bg-gray-900">
      <PageHeader
        title={`Hello, ${dashboard.driver_name} 👋`}
        subtitle="Here's your activity overview"
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Filters */}
          <Card className="bg-gray-800 border border-gray-700 mb-4">
            <CardContent className="">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={deliveryTypeFilter}
                  onValueChange={setDeliveryTypeFilter}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Delivery Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="clinical_waste">
                      Clinical Waste
                    </SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="samples">Samples</SelectItem>
                  </SelectContent>
                </Select>

                <DateRangeFilter value={dateRange} onChange={setDateRange} />
              </div>
            </CardContent>
          </Card>

          {/* Trip Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Total Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {dashboard.trip_summary.total_trips}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#15941f]" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {dashboard.trip_summary.completed}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {dashboard.trip_summary.in_progress}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Cancelled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {dashboard.trip_summary.cancelled}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#15941f]" />
                  On-Time Delivery Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-[#15941f] mb-2">
                  {onTimeRate ? `${onTimeRate}%` : 'N/A'}

                  {/* {dashboard.trip_summary.onTimeRate}% */}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#15941f] h-2 rounded-full"
                    style={{ width: `{onTimeRate ? ${onTimeRate}% : "N/A"}` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Most Frequent Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {dashboard.trip_summary.most_frequent_client}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  6 deliveries this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Trips */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Upcoming Trips
              </h2>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                View All Trips <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-0">
                {filteredTrips?.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No trips assigned yet</p>
                  </div>
                ) : (
                  <div className="rounded-md border border-gray-700">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700 hover:bg-gray-800">
                          <TableHead className="text-gray-300">
                            Client
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Delivery Type
                          </TableHead>
                          <TableHead className="text-gray-300">Time</TableHead>
                          <TableHead className="text-gray-300">
                            Status
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTrips?.map((trip) => (
                          <TableRow
                            key={trip.id}
                            className="border-gray-700 hover:bg-gray-800"
                          >
                            <TableCell className="text-gray-300">
                              {trip.client_name}
                            </TableCell>
                            <TableCell className="font-medium text-white">
                              {formatDeliveryType(trip.delivery_type)}
                            </TableCell>
                            <TableCell className="text-gray-300 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDateTime(trip.scheduled_time)}
                            </TableCell>
                            <TableCell>
                              {getTripStatusBadge(trip.status)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-300 hover:text-white"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Shifts */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Shifts
            </h2>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-0">
                {dashboard.upcoming_shifts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No shifts scheduled</p>
                  </div>
                ) : (
                  <div className="rounded-md border border-gray-700">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700 hover:bg-gray-800">
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">
                            Shift Time
                          </TableHead>
                          <TableHead className="text-gray-300">
                            Location
                          </TableHead>
                          <TableHead className="text-gray-300">Notes</TableHead>
                          {/* <TableHead className="text-gray-300">
                            Status
                          </TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboard.upcoming_shifts.map((shift) => (
                          <TableRow
                            key={shift.id}
                            className="border-gray-700 hover:bg-gray-800"
                          >
                            <TableCell className="font-medium text-white">
                              {shift.date}
                            </TableCell>
                            <TableCell className="text-gray-300 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {shift.time}
                            </TableCell>
                            <TableCell className="text-gray-300 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {shift.location}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {shift.notes}
                            </TableCell>
                            {/* <TableCell>
                              <Badge
                                className={getStatusBadgeColor(shift.status)}
                              >
                                {shift.status}
                              </Badge>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
