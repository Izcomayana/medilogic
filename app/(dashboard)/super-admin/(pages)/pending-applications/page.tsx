'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Filters } from './components/Filters';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import { ApplicationsTable } from './components/ApplicationsTable';
import { DetailsModal } from './components/Details';

export default function PendingApplicationsPage() {
  const pendingApplicationState = usePendingApplications();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Pending Applications
          </h1>
          <p className="text-sm text-gray-400">
            View applications from regulators and organization admins awaiting
            review.
          </p>
        </div>
      </header>

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
