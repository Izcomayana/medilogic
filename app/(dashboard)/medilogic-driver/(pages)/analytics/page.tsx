'use client';

import useDriverAnalytics from '../../hooks/useDriverAnalytics';
import useFeatureAccess from '../../hooks/useFeatureAccess';
import FeatureLock from '../../FeatureLock';
import DriverAnalyticsCharts from './DriverAnalyticsCharts';
import { Spinner } from '@/components/ui/spinner';

export default function AnalyticsPage() {
  const { analytics, loading } = useDriverAnalytics();
  const { badge } = useFeatureAccess();

  const hasAccess = badge === 'blue' || badge === 'green';

  if (loading) return <Spinner />;

  return (
    <FeatureLock locked={!hasAccess}>
      <div className="space-y-6 m-4">
        <h1 className="text-2xl font-semibold text-white">Driver Analytics</h1>

        {analytics && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-3xl text-white font-semibold">
                  {analytics.profile_views}
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Organizations Viewing</p>
                <p className="text-3xl text-white font-semibold">
                  {Object.keys(analytics.org_views).length}
                </p>
              </div>
            </div>

            {/* Charts */}
            <DriverAnalyticsCharts
              profileViews={analytics.profile_views}
              orgViews={analytics.org_views}
              charts={analytics.charts}
            />
          </>
        )}
      </div>
    </FeatureLock>
  );
}
