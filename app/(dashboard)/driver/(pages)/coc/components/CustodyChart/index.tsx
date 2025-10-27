'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';
import { formatDateTime } from '@/utils/datetime';
import { CustodyAnalyticsPoint } from '@/app/(dashboard)/driver/hooks/useCoc';

interface CustodyTimelineChartProps {
  data: CustodyAnalyticsPoint[];
  loading: boolean;
  error: string | null;
}

export function CustodyTimelineChart({
  data,
  loading,
  error,
}: CustodyTimelineChartProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Custody Event Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-80 w-full bg-gray-700 rounded-lg" />
        ) : error ? (
          <div className="h-80 flex flex-col items-center justify-center text-red-400 text-center">
            <p className="font-medium">⚠️ Failed to load chart</p>
            <p className="text-xs text-red-300 mt-1">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-gray-400">
            No custody analytics data available.
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(v) => formatDateTime(v)}
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis
                  dataKey="stage"
                  stroke="#9CA3AF"
                  fontSize={12}
                  allowDuplicatedCategory={false}
                  type="category"
                />
                <Tooltip
                  labelFormatter={(v) => formatDateTime(v)}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="stage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
