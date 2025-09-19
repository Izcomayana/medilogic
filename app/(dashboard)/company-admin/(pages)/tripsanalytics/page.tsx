/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  Clock,
  Filter,
  Brain,
  BarChart3,
  PieChartIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useTripAnalytics } from '@/hooks/useTrips/useTripAnalytics';
import KeyMetrics from './components/KeyMetrics';
import Filters from './components/Filters';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

const COLORS = ['#15941f', '#3b82f6', '#eab308'];

export default function TripAnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedDriver, setSelectedDriver] = useState('All Drivers');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('All Types');

  // 🔥 Hook to fetch analytics
  const { data, loading, error } = useTripAnalytics({
    start_date: null,
    end_date: null,
    status: null,
    driver_id: selectedDriver !== 'All Drivers' ? selectedDriver : null,
    client_name: null,
    delivery_type:
      selectedDeliveryType !== 'All Types' ? selectedDeliveryType : null,
  });

  const predictedDurationData =
    data?.ai_prediction?.predicted_durations_minutes.map((d, i) => ({
      trip: `Trip ${i + 1}`,
      duration: d,
    })) || [];

  // 2. Delivery Type Distribution → PieChart
  // NOTE: Backend only gives `most_common_delivery_type`,
  // so unless API changes, you might need to calculate distribution
  // from trips endpoint instead. For now, let’s mock it:
  const deliveryTypeData = [
    { name: data?.analytics?.most_common_delivery_type || 'Unknown', value: 1 },
  ];

  // 3. Cost vs Distance → LineChart
  // Same thing: backend only gives totals, not per-trip pairs.
  // For demo, I’ll fabricate from totals until API adds breakdown.
  const costDistanceData = [
    {
      distance: data?.analytics?.total_distance_km || 0,
      cost: data?.analytics?.total_cost || 0,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getFiltersAppliedText = () => {
    const filters = [];
    if (dateRange !== 'all') {
      const dateLabels: { [key: string]: string } = {
        '7days': 'Last 7 days',
        '30days': 'Last 30 days',
        '90days': 'Last 90 days',
      };
      filters.push(dateLabels[dateRange] || dateRange);
    }
    if (selectedDriver !== 'All Drivers')
      filters.push(`Driver: ${selectedDriver}`);
    if (selectedDeliveryType !== 'All Types')
      filters.push(`Type: ${selectedDeliveryType}`);

    return filters.length > 0
      ? `Filters: ${filters.join(', ')}`
      : 'Filters: None applied (showing all trips)';
  };

  if (loading) {
    return <p className="text-gray-400 p-6">Loading trip analytics...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 p-6">Failed to load analytics: {error}</p>
    );
  }

  if (!data) {
    return <p className="text-gray-400 p-6">No analytics data available</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title={'Trip Analytics'}
        subtitle="Monitor insights, predictions, and trends across all trips"
      />

      <main className="flex-1 p-6">
        <Filters />

        <KeyMetrics />

        {/* AI Predictions & Insights */}
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Predictions & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">
                      Average Predicted Trip Duration
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {data.ai_prediction.average_predicted_duration} mins
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Based on historical data and current conditions
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">
                      Predicted Durations Sample
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {data.ai_prediction.predicted_durations_minutes.map(
                      (duration: any, index: any) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-600 text-white"
                        >
                          {duration}m
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-sm font-semibold text-white mb-2">
                  AI Insight
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {data.ai_insight}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Predicted Duration Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Predicted Trip Durations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictedDurationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="trip" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Bar
                      dataKey="duration"
                      fill="#15941f"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Type Distribution */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Delivery Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deliveryTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deliveryTypeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-4">
                  {deliveryTypeData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-sm text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-white font-medium">
                          {item.value}
                        </span>
                        {/* <span className="text-xs text-gray-400 ml-2">
                          ({item.percentage}%)
                        </span> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost vs Distance Chart */}
        <Card className="dashboard-card mb-6 gap-4">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Cost vs Distance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costDistanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="distance"
                    stroke="#9CA3AF"
                    fontSize={12}
                    label={{
                      value: 'Distance (km)',
                      position: 'insideBottom',
                      offset: -10,
                    }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    label={{
                      value: 'Cost (₦)',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB',
                    }}
                    formatter={(value: any) => [formatCurrency(value), 'Cost']}
                    labelFormatter={(label: any) => `Distance: ${label} km`}
                  />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Filters Applied Summary */}
        <Card className="dashboard-card">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="h-4 w-4" />
              <span>{getFiltersAppliedText()}</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
