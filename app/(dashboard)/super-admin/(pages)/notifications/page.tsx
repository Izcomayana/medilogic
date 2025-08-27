'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationsDropdown } from '@/components/ui/notifications-dropdown';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';
import { TabsFilter } from './components/TabsFilter';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationsTable } from './components/NotificationsTable';

export default function NotificationsPage() {
  const notificationState = useNotifications();

  const { markAllAsRead } = notificationState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-3">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Notifications</h1>
          <p className="text-sm text-gray-400">
            Stay updated on important system activities.
          </p>
        </div>
        <Button onClick={markAllAsRead} className="primary-button">
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
        <NotificationsDropdown />
      </header>

      <main className="flex-1 p-3">
        {/* Tabs and Filters */}
        <TabsFilter {...notificationState} />

        {/* Notifications Table */}
        <NotificationsTable {...notificationState} />
      </main>
    </div>
  );
}
