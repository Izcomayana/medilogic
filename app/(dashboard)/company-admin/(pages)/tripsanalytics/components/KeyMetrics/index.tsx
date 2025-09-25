import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, DollarSign, Package, Target } from 'lucide-react';
import { useTripAnalytics } from '@/hooks/tripsAnalytics/useTripAnalytics';
import { formatDeliveryType } from '@/hooks/utils';
import { KeyMetricsSkeleton } from './keyMetricsSkeleton';

type KeyMetricsProps = ReturnType<typeof useTripAnalytics>;

export default function keyMetrics({
  analytics,
  formatCurrency,
  loading,
}: KeyMetricsProps) {
  function KeyMetricsSkeleton() {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="w-24 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="w-16 h-6 bg-gray-600 rounded animate-pulse" />
              <div className="w-20 h-3 mt-2 bg-gray-700 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  if (loading) return <KeyMetricsSkeleton />;

  if (!analytics) {
    return <p className="text-gray-400 p-6">No analytics data available</p>;
  }

  return (
    <>
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Trips
            </CardTitle>
            <Truck className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics.totalTrips}
            </div>
            {/* <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last period
              </div> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Distance
            </CardTitle>
            <MapPin className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics.totalDistance} km
            </div>
            {/* <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +8% from last period
              </div> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(analytics.totalCost)}
            </div>
            {/* <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +15% from last period
              </div> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Average Cost
            </CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(analytics.averageCost)}
            </div>
            {/* <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3% from last period
              </div> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-medium text-gray-300">
              Common Delivery Type
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">
              {formatDeliveryType(analytics.mostCommonDeliveryType || 'NA')}
            </div>
            {/* <div className="text-xs text-gray-400 mt-1">
                53% of all deliveries
              </div> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
