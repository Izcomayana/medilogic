'use client';

import { PageHeader } from '../components/PageHeader';
import { useClientDashboard } from './hooks/useClientDashboard';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { formatDeliveryType } from '@/hooks/utils';

export const Client = () => {
  const clientId = '025995c9-4794-4e03-b361-4c2d5e7cf75b'; // TODO: replace dynamically
  const { data, loading } = useClientDashboard(clientId);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: 'var(--brand-dark)' }}
      >
        <Loader2
          className="animate-spin"
          style={{ color: 'var(--brand-primary)' }}
          size={40}
        />
      </div>
    );
  }

  if (!data) return null;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={16} className="text-emerald-500" />;
      case 'in_progress':
        return <Clock size={16} className="text-amber-500" />;
      case 'cancelled':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--brand-dark)' }}
    >
      <PageHeader
        title={data.client_name}
        subtitle="Welcome to your delivery dashboard"
      />

      <main className="flex-1 p-8 space-y-8">
        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Trips */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75 text-gray-50">
                    Total Trips
                  </p>
                  <h2 className="text-4xl font-bold mt-2 text-gray-50">
                    {data.trip_count}
                  </h2>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  <TrendingUp size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75 text-gray-50">
                    Completed
                  </p>
                  <h2 className="text-4xl font-bold mt-2 text-emerald-500">
                    {data.breakdown.completed}
                  </h2>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/20">
                  <CheckCircle size={24} className="text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* In Progress */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75 text-gray-50">
                    In Progress
                  </p>
                  <h2 className="text-4xl font-bold mt-2 text-amber-500">
                    {data.breakdown.in_progress}
                  </h2>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/20">
                  <Clock size={24} className="text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancelled */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75 text-gray-50">
                    Cancelled
                  </p>
                  <h2 className="text-4xl font-bold mt-2 text-red-500">
                    {data.breakdown.cancelled}
                  </h2>
                </div>
                <div className="p-3 rounded-lg bg-red-500/20">
                  <AlertCircle size={24} className="text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="border-0 shadow-lg"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-gray-50">
                Most Delivery Type
              </p>
              <h2 className="text-3xl font-bold mt-4 capitalize text-gray-100">
                {formatDeliveryType(data.analytics.most_delivery_type || '—')}
              </h2>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-gray-50">
                Avg Speed
              </p>
              <div className="flex items-baseline gap-2 mt-4">
                <h2 className="text-3xl font-bold text-gray-100">
                  {data.analytics.average_delivery_speed_hrs ?? '—'}
                </h2>
                <span className="text-sm text-gray-100">hours</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg"
            style={{ background: '#15202b' }}
          >
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-gray-50">
                Total Spent
              </p>
              <h2 className="text-3xl font-bold mt-4 text-gray-100">
                {data.analytics.total_spent}
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* RECENT TRIPS */}
        <Card className="border-0 shadow-lg" style={{ background: '#15202b' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-50">Recent Trips</h3>
              <span className="text-sm text-gray-400">
                {data.trips.length} total
              </span>
            </div>

            <div className="space-y-4">
              {data.trips.slice(0, 5).map((trip: any) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-opacity-50 transition-colors"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-50">
                      {trip.pickup_location?.split(',')[0]} {' → '}{' '}
                      {trip.dropoff_location?.split(',')[0]}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(trip.scheduled_time).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(trip.status)}
                        <p className="text-sm font-medium capitalize">
                          {trip.status.replace('_', ' ')}
                        </p>
                      </div>
                      <p className="text-xs text-gray-300">{trip.priority}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
