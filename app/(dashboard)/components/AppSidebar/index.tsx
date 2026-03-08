/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Building2,
  Home,
  Shield,
  Users,
  ClipboardList,
  FileText,
  Logs,
  Bell,
  AppWindow,
  Route,
  Settings,
  ChartNoAxesCombined,
  Waypoints,
  Link2,
  Receipt,
  BadgeAlert,
  MessageSquare,
  CarFront,
  CalendarCheck,
  BarChart3,
  // UserRoundPen,
  Star,
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
      title: 'Medilogic Drivers',
      url: '/super-admin/medilogic-drivers',
      icon: CarFront,
    },
    {
      title: 'Pending Applications',
      url: '/super-admin/pending-applications',
      icon: AppWindow,
    },
    {
      title: 'Testimonials',
      url: '/super-admin/testimonials',
      icon: Star,
    },
    { title: 'Activity Logs', url: '/super-admin/activity-logs', icon: Logs },
    { title: 'Support', url: '/super-admin/support', icon: MessageSquare },
    { title: 'Notifications', url: '/super-admin/notifications', icon: Bell },
  ],
  admin: [
    { title: 'Dashboard', url: '/company-admin', icon: Home },
    { title: 'Users', url: '/company-admin/users', icon: Users },
    { title: 'Trips', url: '/company-admin/trips', icon: Route },
    {
      title: 'Trips Analytics',
      url: '/company-admin/tripsanalytics',
      icon: Waypoints,
    },
    {
      title: 'Medilogic Drivers',
      url: '/company-admin/medilogic-drivers',
      icon: CarFront,
    },
    {
      title: 'Charts',
      url: '/company-admin/charts',
      icon: ChartNoAxesCombined,
    },
    { title: 'Invoices', url: '/company-admin/invoices', icon: Receipt },
    { title: 'Incidents', url: '/company-admin/incidents', icon: BadgeAlert },
    // {
    //   title: 'Assignments',
    //   url: '/company-admin/assignments',
    //   icon: ClipboardList,
    // },
    { title: 'Support', url: '/company-admin/support', icon: MessageSquare },
    { title: 'Compliance', url: '/company-admin/compliance', icon: Shield },
    { title: 'Activity Logs', url: '/company-admin/activity-logs', icon: Logs },
    { title: 'Settings', url: '/company-admin/settings', icon: Settings },
  ],
  medilogic_driver: [
    { title: 'Dashboard', url: '/medilogic-driver', icon: Home },
    { title: 'Analytics', url: '/medilogic-driver/analytics', icon: BarChart3 },
  ],
  driver: [
    { title: 'Dashboard', url: '/driver', icon: Home },
    { title: 'My Trips', url: '/driver/trips', icon: ClipboardList },
    { title: 'Availability', url: '/driver/availability', icon: CalendarCheck },
    { title: 'PODs', url: '/driver/pods', icon: FileText },
    { title: 'COC', url: '/driver/coc', icon: Link2 },
    { title: 'Incidents', url: '/driver/incidents', icon: ClipboardList },
    { title: 'Support', url: '/driver/support', icon: MessageSquare },
    { title: 'Settings', url: '/driver/settings', icon: Settings },
  ],
  regulator: [
    { title: 'Dashboard', url: '/regulator', icon: Home },

    { title: 'Incidents', url: '/regulator/incidents', icon: ClipboardList },
    { title: 'Compliance', url: '/regulator/compliance', icon: Shield },
  ],
  client: [
    { title: 'Dashboard', url: '/client', icon: Home },
    { title: 'Settings', url: '/client/settings', icon: Settings },
    { title: 'Invoices', url: '/client/invoices', icon: Receipt },
    { title: 'My Trips', url: '/client/#', icon: ClipboardList },
    { title: 'Support', url: '/client/support', icon: MessageSquare },
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
