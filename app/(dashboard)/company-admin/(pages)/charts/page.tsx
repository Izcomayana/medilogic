/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChartIcon, BarChart3, TrendingUp, Filter } from 'lucide-react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { formatDateStart, formatDateEnd } from '@/utils/datetime';
import DateRangeFilter from '../../../components/DateRange';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export type DateRangeLocal = { from?: Date; to?: Date };

export default function AdminCharts() {
  const authorizedRequest = useAuthorizedRequest();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const [dateRange, setDateRange] = useState<DateRangeLocal>();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    authorizedRequest(async (token) => {
      const res = await axios.get(
        'https://medilogic-backend.onrender.com/admin-dashboard/admin-dashboard/charts',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            start_date: dateRange?.from
              ? formatDateStart(dateRange.from)
              : undefined,
            end_date: dateRange?.to ? formatDateEnd(dateRange.to) : undefined,
          },
        }
      );

      if (!isMounted) return;

      const { delivery_type, monthly_trips, top_drivers } = res.data;

      // Transform delivery_type object into array
      const deliveryTypeData = Object.entries(delivery_type).map(
        ([name, value]) => ({ name, value })
      );

      // Transform monthly_trips object into array
      const monthlyTripData = Object.entries(monthly_trips).map(
        ([month, value]) => ({ month, value })
      );

      // Transform top_drivers into chart data
      const topDriversData = top_drivers.map((d: any, index: number) => ({
        name: d.driver_id === 'None' ? 'Unassigned' : `Driver ${index + 1}`,
        trips: d.trip_count,
      }));

      setData({ deliveryTypeData, monthlyTripData, topDriversData });
    }, 'Failed to load charts')
      .catch((err) => {
        setError(err.message || 'Failed to load charts');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest, dateRange]);

  function ChartWrapper({
    title,
    icon,
    loading,
    error,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    loading: boolean;
    error: string | null;
    children: React.ReactNode;
  }) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {icon} {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <Skeleton className="h-full w-full rounded-lg bg-gray-800" />
            </div>
          ) : error ? (
            <div className="h-80 flex flex-col items-center justify-center text-center text-red-400 border border-red-500/30 rounded-lg bg-red-900/10 p-4">
              <p className="font-medium">⚠️ Failed to load {title}</p>
              <p className="text-xs text-red-300 mt-1">{error}</p>
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>
    );
  }

  if (!data && !loading) return null;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <PageHeader
          title={'Analytics & Charts'}
          subtitle="Visual insights for operations and logistics"
        />

        <div className="flex-1 p-6">
          {/* Filters */}
          <Card className="dashboard-card mb-6 flex-row justify-between items-center">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Delivery Type Pie Chart */}
            <ChartWrapper
              title="Delivery Type Distribution"
              icon={<PieChartIcon className="h-5 w-5" />}
              loading={loading}
              error={error}
            >
              <div className="h-80 flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-2/3 h-full flex justify-center">
                  <ResponsiveContainer width="80%" height="80%">
                    <PieChart>
                      <Pie
                        data={data?.deliveryTypeData || []}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {(data?.deliveryTypeData || []).map(
                          (entry: any, index: number) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#111827',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Right-side legend */}
                {data?.deliveryTypeData && data.deliveryTypeData.length > 0 && (
                  <div className="w-full lg:w-1/3 space-y-4 hidden lg:block">
                    {data.deliveryTypeData.map((item: any, index: number) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ChartWrapper>

            {/* Monthly Trips Line Chart */}
            <ChartWrapper
              title="Monthly Trip Count"
              icon={<TrendingUp className="h-5 w-5" />}
              loading={loading}
              error={error}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data?.monthlyTripData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="month"
                      stroke="#9CA3AF"
                      fontSize={12}
                      label={{
                        value: 'Months',
                        position: 'insideBottom',
                        offset: -5,
                      }}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      fontSize={12}
                      label={{
                        value: 'Trips',
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
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#10b981' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartWrapper>

            {/* Top Drivers Bar Chart */}
            <ChartWrapper
              title="Top Drivers per Trip"
              icon={<BarChart3 className="h-5 w-5" />}
              loading={loading}
              error={error}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.topDriversData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Bar dataKey="trips" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
