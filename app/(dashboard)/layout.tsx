import type React from 'react';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/(dashboard)/components/AppSidebar';
import { AuthProvider } from '@/components/auth';
import DashboardShell from './dashboard-shell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <DashboardShell>{children}</DashboardShell>
      </SidebarProvider>
    </AuthProvider>
  );
}
