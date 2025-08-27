'use client';

import { Filters } from './components/Filters';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import { ApplicationsTable } from './components/ApplicationsTable';
import { DetailsModal } from './components/Details';
import { PageHeader } from '../../PageHeader';

export default function PendingApplicationsPage() {
  const pendingApplicationState = usePendingApplications();
  const { sortedApplications } = pendingApplicationState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title={`Pending Applications (${sortedApplications.length})`}
        subtitle=" View applications from regulators and organization admins awaiting
            review."
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <Filters {...pendingApplicationState} />

        {/* Applications Table */}
        <ApplicationsTable {...pendingApplicationState} />
      </main>

      {/* Application Details Modal */}
      <DetailsModal {...pendingApplicationState} />
    </div>
  );
}
