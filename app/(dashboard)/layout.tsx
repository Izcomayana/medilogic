import type React from "react";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { AuthProvider } from "@/components/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 bg-gray-900 min-h-screen max-w-dvw">
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
