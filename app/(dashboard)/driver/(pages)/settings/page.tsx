'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Shield, Bell } from 'lucide-react';
import { PageHeader } from '@/app/(dashboard)/PageHeader';
import { useSettings } from './useSettings';
import { AccountsTab } from './components/Accounts';
import { ProfileTab } from './components/Profiles';
import { SecurityTab } from './components/Security';
import { NotificationsTab } from './components/Notifications';

export default function AdminSettingsPage() {
  const settingState = useSettings();
  const { activeTab, setActiveTab } = useSettings();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Settings"
        subtitle="Manage your account, security, and preferences"
      />

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-gray-700">
                <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">Profile</span>
                    {/* Profile */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:block">Account</span>
                    {/* Account */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden md:block">Security</span>
                    {/* Security */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="hidden md:block">Notifications</span>
                    {/* Notifications */}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Profile Tab */}
              <ProfileTab {...settingState} />

              {/* Account Tab */}
              <AccountsTab {...settingState} />

              {/* Security Tab */}
              <SecurityTab {...settingState} />

              {/* Notifications Tab */}
              <NotificationsTab {...settingState} />
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
