import { useTripAnalytics } from '@/hooks/tripsAnalytics/useTripAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
  BarChart3,
  PieChartIcon,
} from 'lucide-react';

type ChartsProps = ReturnType<typeof useTripAnalytics>;

const COLORS = ['#15941f', '#3b82f6', '#eab308'];

export default function Charts({
  loading,
  error,
  deliveryTypeData,
  deliveryTypeColors,
  predictedDurationData,
}: ChartsProps) {
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

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Delivery Type Distribution */}
        <ChartWrapper
          title="Trips per Delivery Type"
          icon={<BarChart3 className="h-5 w-5" />}
          loading={loading}
          error={error}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTypeData}>
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
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {deliveryTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={deliveryTypeColors[entry.name] || '#9CA3AF'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartWrapper>

        <ChartWrapper
          title="Delivery Type Distribution"
          icon={<PieChartIcon className="h-5 w-5" />}
          loading={loading}
          error={error}
        >
          <div className="h-80 flex items-center">
            <div className="w-1/2 h-full">
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
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-white font-medium">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartWrapper>
      </div>

      {/* Predicted Duration per Trip Chart */}
      <ChartWrapper
        title="Predicted Duration per Trip"
        icon={<BarChart3 className="h-5 w-5" />}
        loading={loading}
        error={error}
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictedDurationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="trip"
                stroke="#9CA3AF"
                fontSize={12}
                label={{ value: 'Trips', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
                formatter={(value: number) => `${value.toFixed(2)} min`}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, fill: '#10b981' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </>
  );
}
