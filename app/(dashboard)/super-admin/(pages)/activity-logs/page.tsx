'use client';

import { Filters } from './components/Filters';
import { LogsTable } from './components/LogsTable';
import { useActivityLogs } from '@/hooks/useActivity';
import { PageHeader } from '../../PageHeader';

export default function ActivityLogs() {
  const logsState = useActivityLogs();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Activity Logs"
        subtitle="Track all system activities for accountability and compliance."
      />

      <main className="flex-1 p-3">
        {/* Filters Section */}
        <Filters {...logsState} />

        {/* Activity Logs Table */}
        <LogsTable {...logsState} />
      </main>
    </div>
  );
}
