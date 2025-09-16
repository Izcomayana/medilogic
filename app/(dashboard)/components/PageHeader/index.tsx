'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ViewProfileDropdown } from '@/components/ui/view-profile';
import { NotificationsDropdown } from '@/components/ui/notifications-dropdown';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
      <SidebarTrigger className="text-white hover:bg-gray-800" />
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 hidden md:block">{subtitle}</p>
        )}
      </div>
      <ViewProfileDropdown />
      <NotificationsDropdown />
    </header>
  );
}