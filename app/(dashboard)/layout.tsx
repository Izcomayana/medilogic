import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { AuthProvider } from "@/components/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 bg-gray-900 min-h-screen max-w-dvw">{children}</main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
