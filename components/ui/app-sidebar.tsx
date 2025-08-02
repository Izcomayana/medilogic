"use client";

import {
  Building2,
  Home,
  Shield,
  Users,
  UserPlus,
  RotateCcw,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    url: "/super-admin",
    icon: Home,
  },
  {
    title: "Organizations",
    url: "/super-admin/organizations",
    icon: Building2,
  },
  {
    title: "Org Users",
    url: "/super-admin/orgusers",
    icon: Users,
  },
  {
    title: "Invite Codes",
    url: "/super-admin/invitecodes",
    icon: RotateCcw,
  },
  {
    title: "Regulators",
    url: "/super-admin/regulators",
    icon: Shield,
  },
  {
    title: "Create User",
    url: "/create-user",
    icon: UserPlus,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-700 ">
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-2">
          {/* Logo */}
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
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
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
