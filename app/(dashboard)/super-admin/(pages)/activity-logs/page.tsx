'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Filters } from './components/Filters';
import { LogsTable } from './components/LogsTable';
import { Download } from 'lucide-react';
import { useActivityLogs } from '@/hooks/useActivity';

export default function ActivityLogs() {
  const logsState = useActivityLogs();

  const { filteredLogs } = logsState;

  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(
      `${type.toUpperCase()} export started for ${filteredLogs.length} activity logs`
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-3">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Activity Logs</h1>
          <p className="text-sm text-gray-400 hidden lg;block">
            Track all system activities for accountability and compliance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('csv')}
            variant="outline"
            className="border-gray-100 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExport('pdf')}
            className="primary-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </header>

      <main className="flex-1 p-3">
        {/* Filters Section */}
        <Filters {...logsState} />

        {/* Activity Logs Table */}
        <LogsTable {...logsState} />
      </main>
    </div>
  );
}
