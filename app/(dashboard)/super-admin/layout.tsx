import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Admin Dashboard",
  description:
    "Comprehensive admin dashboard for managing organizations, users, and regulators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 bg-gray-900 min-h-screen">{children}</main>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
