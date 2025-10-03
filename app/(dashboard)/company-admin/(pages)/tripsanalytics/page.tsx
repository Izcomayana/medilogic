/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Filter, Brain, BarChart3, Lightbulb } from 'lucide-react';
import { useTripAnalytics } from '@/hooks/tripsAnalytics/useTripAnalytics';
import KeyMetrics from './components/KeyMetrics';
import Filters from './components/Filters';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import Charts from './components/Charts';
import { Skeleton } from '@/components/ui/skeleton';

export default function TripAnalyticsPage() {
  const tripsAnalyticState = useTripAnalytics();
  
  const { analytics, getFiltersAppliedText, loading, error } =
    tripsAnalyticState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title={'Trip Analytics'}
        subtitle="Monitor insights, predictions, and trends across all trips"
      />

      <main className="flex-1 p-6">
        <Filters {...tripsAnalyticState} />

        <KeyMetrics {...tripsAnalyticState} />

        {/* AI Predictions & Insights */}
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Predictions & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left side - Metrics */}
                <div className="space-y-4">
                  {/* Average Predicted Duration */}
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">
                        Average Predicted Trip Duration
                      </span>
                    </div>
                    <Skeleton className="h-10 w-24 mb-2" />
                    <div className="text-xs text-gray-400 mt-1">
                      Based on historical data and current conditions
                    </div>
                  </div>

                  {/* Predicted Durations Sample */}
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">
                        Predicted Durations Sample
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-12 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5" color="#f7fb04" />
                    <h3 className="text-sm font-semibold text-white">
                      AI Insight
                    </h3>
                  </div>

                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-5/6 mb-2" />
                  {/* <Skeleton className="h-3 w-2/3" /> */}
                </div>
              </div>
            ) : error ? (
              <div className="h-80 flex flex-col items-center justify-center text-center text-red-400 border border-red-500/30 rounded-lg bg-red-900/10 p-4">
                <p className="font-medium">
                  ⚠️ Failed to load AI Predictions & Insights
                </p>
                <p className="text-xs text-red-300 mt-1">{error}</p>
              </div>
            ) : (
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
                      {analytics?.aiPrediction.average_predicted_duration} mins
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
                      {analytics?.aiPrediction.predicted_durations_minutes.map(
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
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5" color="#f7fb04" />
                    <h3 className="text-sm font-semibold text-white">
                      AI Insight
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {analytics?.aiInsight}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Charts {...tripsAnalyticState} />

        {/* Filters Applied Summary */}
        <Card className="dashboard-card mt-4">
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
