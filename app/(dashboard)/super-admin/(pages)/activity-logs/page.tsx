'use client';

import { toast } from 'sonner';
import { Filters } from './components/Filters';
import { LogsTable } from './components/LogsTable';
import { useActivityLogs } from '@/hooks/useActivity';
import { PageHeader } from '../../PageHeader';

export default function ActivityLogs() {
  const logsState = useActivityLogs();

  const {
    filteredLogs,
    exportingcsv,
    exportLogsCSV,
    exportingpdf,
    exportLogsPDF,
  } = logsState;

  const handleExport = async (type: 'csv' | 'pdf') => {
    if (type === 'csv') {
      try {
        await exportLogsCSV();
        toast.success(`CSV export completed for ${filteredLogs.length} logs`);
      } catch {
        toast.error('Failed to export CSV');
      }
    } else if (type === 'pdf') {
      try {
        await exportLogsPDF();
        toast.success(`PDF export completed for ${filteredLogs.length} logs`);
      } catch {
        toast.error('Failed to export PDF');
      }
    } else {
      toast.info('PDF export not implemented yet');
    }
  };

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
