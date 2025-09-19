import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, DollarSign, Package, Target } from 'lucide-react';
import { useTripAnalytics } from '@/hooks/useTrips/useTripAnalytics';

export default function keyMetrics() {
  const { data } = useTripAnalytics();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!data) {
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
              {data.analytics.total_trips}
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
              {data.analytics.total_distance_km} km
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
              {formatCurrency(data.analytics.total_cost)}
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
              {formatCurrency(data.analytics.average_cost)}
            </div>
            {/* <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3% from last period
              </div> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Common Type
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {data.analytics.most_common_delivery_type || 'N/A'}
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
