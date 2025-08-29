'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, FileText, Calendar, Clock } from 'lucide-react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { PageHeader } from '../PageHeader';

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

          {/* Recent Trips */}
          <Card className="dashboard-card">
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
          </Card>
        </div>
      )}
    </div>
  );
};

// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Truck,
//   Package,
//   FileText,
//   Calendar,
//   TrendingUp,
//   Users,
//   MapPin,
//   Clock,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const stats = [
//   {
//     title: 'Trips Today',
//     value: '47',
//     change: '+12% from yesterday',
//     icon: Truck,
//     trend: 'up',
//   },
//   {
//     title: 'Waste Pickups Completed',
//     value: '134',
//     change: '+8% this week',
//     icon: Package,
//     trend: 'up',
//   },
//   {
//     title: 'Pending Reports',
//     value: '23',
//     change: 'Requires attention',
//     icon: FileText,
//     trend: 'warning',
//   },
//   {
//     title: 'Assignments Today',
//     value: '89',
//     change: 'All scheduled',
//     icon: Calendar,
//     trend: 'neutral',
//   },
// ];

// const recentTrips = [
//   {
//     id: 'T001',
//     driver: 'John Smith',
//     route: 'Downtown Route A',
//     status: 'In Progress',
//     startTime: '08:30 AM',
//     estimatedCompletion: '11:45 AM',
//   },
//   {
//     id: 'T002',
//     driver: 'Sarah Johnson',
//     route: 'Industrial Zone B',
//     status: 'Completed',
//     startTime: '07:00 AM',
//     completedTime: '10:15 AM',
//   },
//   {
//     id: 'T003',
//     driver: 'Mike Davis',
//     route: 'Residential Area C',
//     status: 'Pending',
//     startTime: '09:00 AM',
//     estimatedCompletion: '12:30 PM',
//   },
// ];

// export const AdminDashboard = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900">
//       <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
//         <SidebarTrigger className="text-white hover:bg-gray-800" />
//         <div className="flex-1">
//           <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
//           <p className="text-sm text-gray-400">
//             Operations overview and logistics management
//           </p>
//         </div>
//       </header>

//       <div className="flex-1 p-6">
//         {/* Stats Cards */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
//           {stats.map((stat, index) => (
//             <Card key={index} className="dashboard-card">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-300">
//                   {stat.title}
//                 </CardTitle>
//                 <stat.icon className="h-4 w-4 text-gray-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-white">
//                   {stat.value}
//                 </div>
//                 <div
//                   className={`text-xs flex items-center gap-1 mt-1 ${
//                     stat.trend === 'up'
//                       ? 'text-[#15941f]'
//                       : stat.trend === 'warning'
//                         ? 'text-yellow-500'
//                         : 'text-gray-400'
//                   }`}
//                 >
//                   {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
//                   {stat.change}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Recent Trips */}
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center gap-2">
//                 <Truck className="h-5 w-5" />
//                 Recent Trips
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentTrips.map((trip) => (
//                   <div
//                     key={trip.id}
//                     className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="flex flex-col">
//                         <span className="text-sm font-medium text-white">
//                           {trip.driver}
//                         </span>
//                         <span className="text-xs text-gray-400 flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           {trip.route}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           trip.status === 'Completed'
//                             ? 'bg-[#15941f] text-white'
//                             : trip.status === 'In Progress'
//                               ? 'bg-blue-600 text-white'
//                               : 'bg-yellow-600 text-white'
//                         }`}
//                       >
//                         {trip.status}
//                       </span>
//                       <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {trip.status === 'Completed'
//                           ? trip.completedTime
//                           : trip.estimatedCompletion}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Stats Mini Chart */}
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="text-white">Daily Trends</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-300">
//                     Trip Completion Rate
//                   </span>
//                   <span className="text-sm text-[#15941f] font-medium">
//                     94%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div
//                     className="bg-[#15941f] h-2 rounded-full"
//                     style={{ width: '94%' }}
//                   ></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-300">
//                     On-Time Deliveries
//                   </span>
//                   <span className="text-sm text-[#15941f] font-medium">
//                     87%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div
//                     className="bg-[#15941f] h-2 rounded-full"
//                     style={{ width: '87%' }}
//                   ></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-300">
//                     Driver Utilization
//                   </span>
//                   <span className="text-sm text-blue-500 font-medium">76%</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div
//                     className="bg-blue-500 h-2 rounded-full"
//                     style={{ width: '76%' }}
//                   ></div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Actions */}
//         <Card className="dashboard-card mt-6">
//           <CardHeader>
//             <CardTitle className="text-white">Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-3 md:grid-cols-4">
//               <Button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
//                 <Calendar className="h-4 w-4" />
//                 View Assignments
//               </Button>
//               <Button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
//                 <FileText className="h-4 w-4" />
//                 Export Reports
//               </Button>
//               <Button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
//                 <Users className="h-4 w-4" />
//                 Manage Drivers
//               </Button>
//               <Button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
//                 <TrendingUp className="h-4 w-4" />
//                 View Analytics
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
