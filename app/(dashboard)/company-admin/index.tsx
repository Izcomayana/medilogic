'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, FileText, Calendar, Clock, Users } from 'lucide-react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { PageHeader } from '../components/PageHeader';

// Skeleton component for dashboard cards
const DashboardSkeleton = () => (
  <div className="flex-1 p-6">
    {/* Skeleton Stats */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className="dashboard-card animate-pulse bg-gray-800/50 border border-gray-700"
        >
          <CardHeader>
            <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-gray-700 rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Skeleton Tops */}
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      {[1, 2].map((i) => (
        <Card
          key={i}
          className="dashboard-card animate-pulse bg-gray-800/50 border border-gray-700"
        >
          <CardHeader>
            <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-1">
                  {/* Rank + Name + Trips */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-8 bg-gray-700 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-4 w-12 bg-gray-700 rounded"></div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Skeleton Recent Trips */}
    <Card className="dashboard-card animate-pulse bg-gray-800/50 border border-gray-700">
      <CardHeader>
        <div className="h-5 w-32 bg-gray-700 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div>
                <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-700 rounded"></div>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

type DashboardResponse = {
  summary: {
    total_trips: number;
    completed: number;
    in_progress: number;
    cancelled: number;
    total_cost: number;
  };
  trips: {
    id: string;
    driver_name: string;
    route: string;
    status: 'Completed' | 'In Progress' | 'Pending' | 'Cancelled';
    start_time: string;
    completed_time?: string;
    estimated_completion?: string;
  }[];
  top_drivers: { driver_name: string; trip_count: number }[];
  top_clients: { client_name: string; trip_count: number }[];
};

export const AdminDashboard = () => {
  const authorizedRequest = useAuthorizedRequest();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const dashboard = await authorizedRequest(async (token) => {
          const res = await axios.get<DashboardResponse>(
            'https://medilogic-backend.onrender.com/admin-dashboard/admin-dashboard/',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return res.data;
        }, 'Failed to load admin dashboard');

        if (isMounted && dashboard) {
          setData(dashboard);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header is always visible */}
      <PageHeader
        title="Admin"
        subtitle="Operations overview and logistics management"
      />

      {loading ? (
        <DashboardSkeleton />
      ) : !data ? (
        <div className="flex items-center justify-center flex-1 text-red-400">
          Failed to load dashboard
        </div>
      ) : (
        <div className="flex-1 p-6">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-sm text-gray-300">
                  Total Trips
                </CardTitle>
                <Truck className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {data.summary.total_trips}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-sm text-gray-300">
                  Completed
                </CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {data.summary.completed}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-sm text-gray-300">
                  In Progress
                </CardTitle>
                <FileText className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {data.summary.in_progress}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-sm text-gray-300">
                  Cancelled
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {data.summary.cancelled}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 my-8">
            {/* Top Clients */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.top_clients.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No client data available
                  </p>
                ) : (
                  <div className="space-y-4">
                    {data.top_clients.map((client, i) => {
                      const maxTrips = data.top_clients[0].trip_count;
                      const percentage = Math.round(
                        (client.trip_count / maxTrips) * 100
                      );
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white flex items-center gap-2">
                              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                                {i + 1}
                              </span>
                              {client.client_name}
                            </span>
                            <span className="text-xs font-medium text-gray-300">
                              {client.trip_count} trips
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Drivers */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Top Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.top_drivers.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No driver data available
                  </p>
                ) : (
                  <div className="space-y-4">
                    {data.top_drivers.map((driver, i) => {
                      const maxTrips = data.top_drivers[0].trip_count;
                      const percentage = Math.round(
                        (driver.trip_count / maxTrips) * 100
                      );
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white flex items-center gap-2">
                              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                                {i + 1}
                              </span>
                              {driver.driver_name}
                            </span>
                            <span className="text-xs font-medium text-gray-300">
                              {driver.trip_count} trips
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Trips */}
          {/* <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Recent Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.trips.length === 0 ? (
                <p className="text-gray-400 text-sm">No trips available</p>
              ) : (
                <div className="space-y-4">
                  {data.trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                    >
                      <div>
                        <span className="text-sm font-medium text-white">
                          {trip.driver_name}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {trip.route}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            trip.status === 'Completed'
                              ? 'bg-[#15941f] text-white'
                              : trip.status === 'In Progress'
                                ? 'bg-blue-600 text-white'
                                : trip.status === 'Pending'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-red-600 text-white'
                          }`}
                        >
                          {trip.status}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {trip.status === 'Completed'
                            ? trip.completed_time
                            : (trip.estimated_completion ?? '—')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}
        </div>
      )}
    </div>
  );
};
