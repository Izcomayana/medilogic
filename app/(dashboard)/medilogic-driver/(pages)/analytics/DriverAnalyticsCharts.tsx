'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

type Props = {
  profileViews: number;
  orgViews: Record<string, number>;
  charts: Record<string, string[]>;
};

export default function DriverAnalyticsCharts({
  profileViews,
  orgViews,
  charts,
}: Props) {
  // Convert org views to chart data
  const orgChartData = Object.entries(orgViews).map(([org, views]) => ({
    org,
    views,
  }));

  // Convert timestamps to daily view chart
  const profileChartData =
    charts?.profile_views?.map((date: string, index: number) => ({
      date: new Date(date).toLocaleDateString(),
      views: index + 1,
    })) || [];

  return (
    <div className="space-y-8">
      {/* Profile Views Chart */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-white mb-4 font-semibold">
          Profile Views Over Time
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={profileChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#15941f"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Organization Views Chart */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-white mb-4 font-semibold">Organization Views</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orgChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="org" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar dataKey="views" fill="#15941f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
