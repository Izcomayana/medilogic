/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Building2,
  Home,
  Shield,
  Users,
  Truck,
  ClipboardList,
  FileText,
  Logs,
  // Bell,
  AppWindow,
  Route,
  // Settings,
} from 'lucide-react';
import { useAuth } from '@/components/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinksByRole: Record<
  string,
  { title: string; url: string; icon: any }[]
> = {
  super_admin: [
    { title: 'Dashboard', url: '/super-admin', icon: Home },
    { title: 'Regulators', url: '/super-admin/regulators', icon: Shield },
    { title: 'Admins', url: '/super-admin/admins', icon: Users },
    {
      title: 'Organizations',
      url: '/super-admin/organizations',
      icon: Building2,
    },
    {
      title: 'Pending Applications',
      url: '/super-admin/pending-applications',
      icon: AppWindow,
    },
    { title: 'Activity Logs', url: '/super-admin/activity-logs', icon: Logs },
    // { title: 'Notifications', url: '/super-admin/notifications', icon: Bell },
  ],
  admin: [
    { title: 'Dashboard', url: '/company-admin', icon: Home },
    { title: 'Trips', url: '/company-admin/trips', icon: Route },
    {
      title: 'Assignments',
      url: '/company-admin/assignments',
      icon: ClipboardList,
    },
    { title: 'Users', url: '/company-admin/users', icon: Users },
    { title: 'Charts', url: '/company-admin/charts', icon: Truck },
    { title: 'Exports', url: '/company-admin/exports', icon: FileText },
    // { title: 'Settings', url: '/company-admin/settings', icon: Settings },
  ],
  regulator: [
    { title: 'Dashboard', url: '/regulator', icon: Home },
    {
      title: 'Organizations',
      url: '/regulator/organizations',
      icon: Building2,
    },
    { title: 'Compliance', url: '/regulator/compliance', icon: Shield },
  ],
  client: [
    { title: 'Dashboard', url: '/client', icon: Home },
    { title: 'My Trips', url: '/client/trips', icon: ClipboardList },
    { title: 'Waste Reports', url: '/client/reports', icon: FileText },
  ],
  driver: [
    { title: 'Dashboard', url: '/driver', icon: Home },
    { title: 'My Trips', url: '/driver/trips', icon: ClipboardList },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  // console.log('Sidebar role:', role);

  const menuItems = sidebarLinksByRole[role ?? ''] || [];

  return (
    <Sidebar className="border-r border-gray-700">
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="rounded transition-transform duration-200 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="lucide lucide-plus h-8 w-8 text-gray-50 rotate-0 transition-transform duration-300 group-hover:rotate-90"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Medilogic
              </span>
            </Link>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-[#15941f] data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-700 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-2 w-2 rounded-full bg-[#15941f]"></div>
          <span>System Online</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
