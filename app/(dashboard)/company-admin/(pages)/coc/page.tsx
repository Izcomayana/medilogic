// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/app/(dashboard)/components/PageHeader"
import { CustodyTimeline } from "@/app/(dashboard)/driver/(pages)/coc/components/CustodyTimeline"
import { CustodyAnalytics } from "@/app/(dashboard)/driver/(pages)/coc/components/CustomAnalytics"
import { CustodyTimelineChart } from "@/app/(dashboard)/driver/(pages)/coc/components/CustodyChart"
import { useCOC } from "@/app/(dashboard)/driver/hooks/useCoc"
import { formatDateTime } from "@/utils/datetime"
import { useAuthorizedRequest } from "@/hooks/useRequest"
import { useProfile } from "@/hooks/useProfile"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

interface CustodySummary {
  organization_id: string
  total_trips: number
  trips_with_custody: number
  compliance_rate: number
  non_compliant_trips: {
    trip_id: string
    client_name: string | null
    driver_name: string | null
    missing_events: string[]
  }[]
  recent_events: {
    timestamp: string
    event_type: string
    driver_name: string
    trip_id: string
  }[]
}

export default function CustodyManagementPage() {
  // Chain of Custody hooks
  const cocState = useCOC()
  const authorizedRequest = useAuthorizedRequest()
  const { user, loading: userLoading } = useProfile()

  const {
    selectedTrip,
    setSelectedTrip,
    isRefreshing,
    tripEvents,
    handleRefresh,
    handleExport,
    loadingEvents,
    loadingAnalytics,
    analyticsData,
    analyticsError,
  } = cocState

  const [adminTrips, setAdminTrips] = useState<any[]>([])
  const [loadingTrips, setLoadingTrips] = useState(false)
  const [dashboardData, setDashboardData] = useState<CustodySummary | null>(null)
  const [loadingDashboard, setLoadingDashboard] = useState(false)
  const [dashboardError, setDashboardError] = useState<string | null>(null)

  const organizationId = user?.organization?.id

  // Fetch all trips for admin
  useEffect(() => {
    const fetchAdminTrips = async () => {
      setLoadingTrips(true)
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get("/trips/trips/", {
            headers: { Authorization: `Bearer ${token}` },
          })
          setAdminTrips(res.data.items || [])
        }, "Failed to fetch trips")
      } catch (err) {
        console.error("Error fetching admin trips:", err)
        toast.error("Failed to load trips")
      } finally {
        setLoadingTrips(false)
      }
    }

    fetchAdminTrips()
  }, [authorizedRequest])

  const fetchDashboardSummary = async () => {
    try {
      setLoadingDashboard(true)
      await authorizedRequest(async (token) => {
        const res = await api.get(`/custody/dashboard/admin/${organizationId}/custody-summary`, {
          headers: { Authorization: `Bearer ${token}`, credentials: "include" },
        })
        setDashboardData(res.data || null)
        setDashboardError(null)
      }, "Failed to fetch custody summary")
    } catch (err: any) {
      setDashboardError(err.message)
    } finally {
      setLoadingDashboard(false)
    }
  }

  useEffect(() => {
    if (!organizationId) return
    fetchDashboardSummary()
  }, [organizationId])

  const selectedTripInfo = adminTrips.find((t) => t.trip_id === selectedTrip || t.id === selectedTrip)

  const handleRefreshAll = async () => {
    await handleRefresh()
    await fetchDashboardSummary()
  }

  if (userLoading || !organizationId) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        <Spinner className="h-5 w-5 mr-2" /> Loading Custody...
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <PageHeader
        title="Custody Management"
        subtitle="Organization-wide compliance overview and trip-specific custody tracking."
      />

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-8">
          {/* ===== SECTION 1: ORG-WIDE COMPLIANCE METRICS ===== */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Compliance Overview</h2>
              <Button
                onClick={handleRefreshAll}
                disabled={isRefreshing || loadingDashboard}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing || loadingDashboard ? "animate-spin" : ""}`} />
              </Button>
            </div>

            {loadingDashboard ? (
              <div className="flex justify-center items-center py-4 text-gray-400">
                <Spinner className="h-5 w-5 mr-2" /> Loading summary...
              </div>
            ) : dashboardError ? (
              <div className="text-red-400 bg-gray-800 p-4 rounded-lg border border-gray-700">{dashboardError}</div>
            ) : dashboardData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 mb-2">Total Trips</p>
                    <p className="text-3xl font-bold text-white">{dashboardData.total_trips}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 mb-2">With Custody Records</p>
                    <p className="text-3xl font-bold text-blue-400">{dashboardData.trips_with_custody}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 mb-2">Compliance Rate</p>
                    <p className="text-3xl font-bold text-green-400">{dashboardData.compliance_rate.toFixed(2)}%</p>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>

          {/* ===== SECTION 2: TRIP SELECTION & DETAILS ===== */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Select Trip</Label>
                <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder={loadingTrips ? "Loading trips..." : "Select a trip"} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
                    {loadingTrips ? (
                      <div className="text-gray-400 text-sm p-2">Loading trips...</div>
                    ) : adminTrips.length > 0 ? (
                      adminTrips.map((trip) => {
                        const formattedType =
                          trip.delivery_type === "other"
                            ? trip.custom_delivery_description || "Other"
                            : trip.delivery_type
                                ?.replaceAll("_", " ")
                                .replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Unknown Type"

                        return (
                          <SelectItem key={trip.trip_id || trip.id} value={trip.trip_id || trip.id}>
                            {`${trip.client_name || "Unknown Client"} — ${formattedType}`}
                          </SelectItem>
                        )
                      })
                    ) : (
                      <div className="text-gray-400 text-sm p-2">No trips found</div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700">
                    <DropdownMenuItem
                      onClick={handleExport}
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Export as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Trip Info Card */}
            {selectedTripInfo && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs uppercase text-gray-400 font-semibold">Client</p>
                      <p className="text-base font-bold text-white">{selectedTripInfo.client_name || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-400 font-semibold">Type</p>
                      <p className="text-base font-bold text-white">
                        {selectedTripInfo.delivery_type
                          ?.replaceAll("_", " ")
                          .replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Unknown Type"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-400 font-semibold">Date</p>
                      <p className="text-base font-bold text-white">
                        {formatDateTime(selectedTripInfo.scheduled_time)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-400 font-semibold">Events Logged</p>
                      <p className="text-lg font-bold text-blue-400">{tripEvents.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ===== SECTION 3: CUSTODY TIMELINE & ANALYTICS ===== */}
          {selectedTrip && (
            <div className="space-y-6">
              <CustodyTimeline tripEvents={tripEvents} loadingEvents={loadingEvents} />
              <CustodyTimelineChart data={analyticsData} loading={loadingAnalytics} error={analyticsError} />
              <CustodyAnalytics {...cocState} />
            </div>
          )}

          {/* ===== SECTION 4: NON-COMPLIANT TRIPS ===== */}
          {dashboardData && dashboardData.non_compliant_trips.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Non-Compliant Trips ({dashboardData.non_compliant_trips.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg">
                  <thead className="bg-gray-800 text-gray-400">
                    <tr>
                      <th className="p-3">Trip ID</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Driver</th>
                      <th className="p-3">Missing Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.non_compliant_trips.map((trip) => (
                      <tr
                        key={trip.trip_id}
                        className="border-t border-gray-700 hover:bg-gray-800/60 cursor-pointer"
                        onClick={() => setSelectedTrip(trip.trip_id)}
                      >
                        <td className="p-3 font-mono text-xs text-blue-400">{trip.trip_id}</td>
                        <td className="p-3">{trip.client_name || "—"}</td>
                        <td className="p-3">{trip.driver_name || "—"}</td>
                        <td className="p-3 text-red-400">{trip.missing_events.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {dashboardData && dashboardData.recent_events.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {dashboardData.recent_events.slice(0, 8).map((event) => (
                  <div
                    key={event.timestamp}
                    className="bg-gray-800 border border-gray-700 p-3 rounded-lg hover:border-gray-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedTrip(event.trip_id)}
                  >
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-blue-400">{event.event_type.replaceAll("_", " ")}</span> by{" "}
                      {event.driver_name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(event.timestamp)} — Trip: {event.trip_id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}







// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState, useEffect } from 'react';
// import { Download, RefreshCw } from 'lucide-react';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { CustodyTimeline } from '@/app/(dashboard)/driver/(pages)/coc/components/CustodyTimeline';
// import { CustodyAnalytics } from '@/app/(dashboard)/driver/(pages)/coc/components/CustomAnalytics';
// import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
// import { CustodyTimelineChart } from '@/app/(dashboard)/driver/(pages)/coc/components/CustodyChart';
// import { useCOC } from '@/app/(dashboard)/driver/hooks/useCoc';
// import { formatDateTime } from '@/utils/datetime';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { api } from '@/lib/api';
// import { toast } from 'sonner';

// export default function ChainOfCustodyPage() {
//   const cocState = useCOC();
//   const authorizedRequest = useAuthorizedRequest();

//   const {
//     selectedTrip,
//     setSelectedTrip,
//     isRefreshing,
//     tripEvents,
//     handleRefresh,
//     handleExport,
//     loadingEvents,
//     loadingAnalytics,
//     analyticsData,
//     analyticsError,
//   } = cocState;

//   // 🧩 Local state for admin trips
//   const [adminTrips, setAdminTrips] = useState<any[]>([]);
//   const [loadingTrips, setLoadingTrips] = useState(false);

//   // 🧠 Fetch all trips for admin
//   useEffect(() => {
//     const fetchAdminTrips = async () => {
//       setLoadingTrips(true);
//       try {
//         await authorizedRequest(async (token) => {
//           const res = await api.get('/trips/trips/', {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           console.log('data:', res.data.items);
//           setAdminTrips(res.data.items || []);
//         }, 'Failed to fetch trips');
//       } catch (err) {
//         console.error('Error fetching admin trips:', err);
//         toast.error('Failed to load trips');
//       } finally {
//         setLoadingTrips(false);
//       }
//     };

//     fetchAdminTrips();
//   }, [authorizedRequest]);

//   const selectedTripInfo = adminTrips.find(
//     (t) => t.trip_id === selectedTrip || t.id === selectedTrip
//   );

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       <PageHeader
//         title="Chain of Custody"
//         subtitle="Track and review custody transfers across all deliveries."
//       />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           {/* Trip Selection & Actions */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex-1">
//               <Label className="block text-sm font-medium text-gray-300 mb-2">
//                 Select Trip
//               </Label>
//               <div>
//                 <Select value={selectedTrip} onValueChange={setSelectedTrip}>
//                   <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                     <SelectValue
//                       placeholder={
//                         loadingTrips ? 'Loading trips...' : 'Select a trip'
//                       }
//                     />
//                   </SelectTrigger>

//                   <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
//                     {loadingTrips ? (
//                       <div className="text-gray-400 text-sm p-2">
//                         Loading trips...
//                       </div>
//                     ) : adminTrips.length > 0 ? (
//                       adminTrips.map((trip) => {
//                         const formattedType =
//                           trip.delivery_type === 'other'
//                             ? trip.custom_delivery_description || 'Other'
//                             : trip.delivery_type
//                                 ?.replaceAll('_', ' ')
//                                 .replace(/\b\w/g, (l: string) =>
//                                   l.toUpperCase()
//                                 ) || 'Unknown Type';

//                         return (
//                           <SelectItem
//                             key={trip.trip_id || trip.id}
//                             value={trip.trip_id || trip.id}
//                           >
//                             {`${trip.client_name || 'Unknown Client'} — ${formattedType}`}
//                           </SelectItem>
//                         );
//                       })
//                     ) : (
//                       <div className="text-gray-400 text-sm p-2">
//                         No trips found
//                       </div>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2 items-end">
//               <Button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 variant="outline"
//                 className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
//                 />
//               </Button>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Export
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-gray-800 border-gray-700">
//                   <DropdownMenuItem
//                     onClick={handleExport}
//                     className="text-gray-300 hover:text-white hover:bg-gray-700"
//                   >
//                     Export as CSV
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* Trip Info Card */}
//           {selectedTripInfo && (
//             <Card className="bg-gray-800 border-gray-700 mb-6">
//               <CardContent className="pt-6">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <p className="text-xs uppercase text-gray-400 font-semibold">
//                       Client
//                     </p>
//                     <p className="text-base font-bold text-white">
//                       {selectedTripInfo.client_name || 'Unknown'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs uppercase text-gray-400 font-semibold">
//                       Type
//                     </p>
//                     <p className="text-base font-bold text-white">
//                       {selectedTripInfo.delivery_type
//                         ?.replaceAll('_', ' ')
//                         .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
//                         'Unknown Type'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs uppercase text-gray-400 font-semibold">
//                       Date
//                     </p>
//                     <p className="text-base font-bold text-white">
//                       {formatDateTime(selectedTripInfo.scheduled_time)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs uppercase text-gray-400 font-semibold">
//                       Events Logged
//                     </p>
//                     <p className="text-lg font-bold text-blue-400">
//                       {tripEvents.length}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Timeline + Analytics */}
//           <div className="flex flex-col gap-6">
//             <CustodyTimeline
//               tripEvents={tripEvents}
//               loadingEvents={loadingEvents}
//             />
//             <CustodyTimelineChart
//               data={analyticsData}
//               loading={loadingAnalytics}
//               error={analyticsError}
//             />
//             <CustodyAnalytics {...cocState} />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



// admin-custody-dashboard-summary

// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { formatDateTime } from '@/utils/datetime';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { api } from '@/lib/api';
// import { useProfile } from '@/hooks/useProfile';

// interface CustodySummary {
//   organization_id: string;
//   total_trips: number;
//   trips_with_custody: number;
//   compliance_rate: number;
//   non_compliant_trips: {
//     trip_id: string;
//     client_name: string | null;
//     driver_name: string | null;
//     missing_events: string[];
//   }[];
//   recent_events: {
//     timestamp: string;
//     event_type: string;
//     driver_name: string;
//     trip_id: string;
//   }[];
// }

// export default function AdminCustodyDashboard() {
//   const [data, setData] = useState<CustodySummary | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user, loading: userLoading } = useProfile();
//   const authorizedRequest = useAuthorizedRequest();

//   const organizationId = user?.organization?.id;

//   const fetchSummary = async () => {
//     try {
//       setLoading(true);
//       await authorizedRequest(async (token) => {
//         const res = await api.get(`/custody/dashboard/admin/${organizationId}/custody-summary`, {
//           headers: { Authorization: `Bearer ${token}`, credentials: 'include' }
//         });

//         setData(res.data || []);
//         setError(null);
//       }, 'Failed to fetch trips');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!organizationId) return; // don't fetch until org ID exists
//     fetchSummary();
//   }, [organizationId]);

//   if (userLoading || !organizationId) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400">
//         <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading profile...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       <PageHeader
//         title="Custody Summary"
//         subtitle="Organization-wide custody compliance and recent activity overview."
//       />

//       <main className="flex-1 overflow-auto p-8 space-y-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
//           <Button
//             onClick={fetchSummary}
//             disabled={loading}
//             variant="outline"
//             className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
//           >
//             {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
//           </Button>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center py-10 text-gray-400">
//             <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading summary...
//           </div>
//         )}

//         {error && (
//           <div className="text-red-400 bg-gray-800 p-4 rounded-lg border border-gray-700">
//             {error}
//           </div>
//         )}

//         {data && (
//           <>
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Total Trips</p>
//                   <p className="text-3xl font-bold text-white">{data.total_trips}</p>
//                 </CardContent>
//               </Card>
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Trips With Custody</p>
//                   <p className="text-3xl font-bold text-blue-400">
//                     {data.trips_with_custody}
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Compliance Rate</p>
//                   <p className="text-3xl font-bold text-green-400">
//                     {data.compliance_rate.toFixed(2)}%
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Non-Compliant Trips */}
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-4">
//                 Non-Compliant Trips ({data.non_compliant_trips.length})
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg">
//                   <thead className="bg-gray-800 text-gray-400">
//                     <tr>
//                       <th className="p-3">Trip ID</th>
//                       <th className="p-3">Client</th>
//                       <th className="p-3">Driver</th>
//                       <th className="p-3">Missing Events</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.non_compliant_trips.map((trip) => (
//                       <tr
//                         key={trip.trip_id}
//                         className="border-t border-gray-700 hover:bg-gray-800/60"
//                       >
//                         <td className="p-3 font-mono text-xs">{trip.trip_id}</td>
//                         <td className="p-3">{trip.client_name || '—'}</td>
//                         <td className="p-3">{trip.driver_name || '—'}</td>
//                         <td className="p-3 text-red-400">
//                           {trip.missing_events.join(', ')}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Recent Events */}
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
//               <div className="space-y-2">
//                 {data.recent_events.map((event) => (
//                   <div
//                     key={event.timestamp}
//                     className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
//                   >
//                     <p className="text-sm text-gray-300">
//                       <span className="font-semibold text-blue-400">
//                         {event.event_type.replaceAll('_', ' ')}
//                       </span>{' '}
//                       by {event.driver_name || 'Unknown'}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {formatDateTime(event.timestamp)} — Trip: {event.trip_id}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }
