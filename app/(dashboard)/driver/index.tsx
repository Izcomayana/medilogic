// import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Truck, FileText, TrendingUp, CheckCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const stats = [
  {
    title: 'Active Trips',
    value: '3',
    change: 'Today',
    icon: MapPin,
    trend: 'up',
  },
  {
    title: 'Deliveries Completed',
    value: '47',
    change: '+2 this week',
    icon: CheckCircle,
    trend: 'up',
  },
  {
    title: 'Total Distance',
    value: '234 km',
    change: 'This week',
    icon: Truck,
    trend: 'neutral',
  },
  {
    title: 'PODs Uploaded',
    value: '45',
    change: 'All verified',
    icon: FileText,
    trend: 'up',
  },
];

const recentTrips = [
  {
    id: 'TRIP001',
    client: 'Clinic ABC',
    destination: '123 Medical Center Dr, Lagos',
    status: 'In Progress',
    startTime: '09:00 AM',
    estimatedCompletion: '11:45 AM',
    progress: 65,
  },
  {
    id: 'TRIP002',
    client: 'TechCorp Solutions',
    destination: '789 Business Park, Abuja',
    status: 'Pending',
    startTime: '14:00 PM',
    estimatedCompletion: '16:30 PM',
    progress: 0,
  },
];

export const Driver = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Driver dashboard"
        subtitle="Welcome back, John Smith"
      />

      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    stat.trend === 'up' ? 'text-[#15941f]' : 'text-gray-400'
                  }`}
                >
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Trips */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Active Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {trip.client}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {trip.destination}
                        </p>
                      </div>
                      <Badge
                        className={
                          trip.status === 'In Progress'
                            ? 'bg-blue-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }
                      >
                        {trip.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{trip.startTime}</span>
                        <span>{trip.estimatedCompletion}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#15941f] h-2 rounded-full transition-all"
                          style={{ width: `${trip.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Trips Completed</span>
                  <span className="text-lg font-bold text-[#15941f]">
                    2 / 5
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">
                    Distance Covered
                  </span>
                  <span className="text-lg font-bold text-[#15941f]">
                    67.3 km
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Earnings</span>
                  <span className="text-lg font-bold text-[#15941f]">
                    ₦15,420
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Rating</span>
                  <span className="text-lg font-bold text-yellow-500">
                    4.8 ⭐
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
