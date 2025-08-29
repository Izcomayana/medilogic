'use client';

import { TabsFilter } from './components/TabsFilter';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationsTable } from './components/NotificationsTable';
import { PageHeader } from '../../../PageHeader';

export default function NotificationsPage() {
  const notificationState = useNotifications();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on important system activities."
      />

      <main className="flex-1 p-3">
        {/* Tabs and Filters */}
        <TabsFilter {...notificationState} />

        {/* Notifications Table */}
        <NotificationsTable {...notificationState} />
      </main>
    </div>
  );
}
