import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function KeyMetricsSkeleton() {
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
