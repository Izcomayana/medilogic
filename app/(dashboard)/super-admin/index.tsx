/* eslint-disable react/no-unescaped-entities */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  Building2,
  // Users,
  Shield,
  // RotateCcw,
  // TrendingUp,
  ShieldUser,
} from 'lucide-react';
import CreateOrganizationDialog from './(pages)/organizations/components/creatOrg';
import { useAdmin } from '@/hooks/useAdmin';
import { useOrganizations } from '@/hooks/orgs/useOrg';
import { useRegulators } from '@/hooks/useReg';
import { CreateRegulatorDialog } from './(pages)/regulators/components/CreateRegulator';
import { CreateAdmin } from './(pages)/admins/components/CreateAdmin';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import { PageHeader } from '../components/PageHeader';

export default function Dashboard() {
  const { filteredAdmins, createAdmin } = useAdmin();
  const { filteredRegs, createReg } = useRegulators();
  const { filteredOrgs, createOrg } = useOrganizations();
  const { sortedApplications } = usePendingApplications();

  const stats = [
    {
      title: 'Total Organizations',
      value: filteredOrgs.length,
      change: '+2 this month',
      icon: Building2,
      trend: 'up',
    },
    // {
    //   title: "Total Org Users",
    //   value: "1,247",
    //   change: "+18% from last month",
    //   icon: Users,
    //   trend: "up",
    // },
    {
      title: 'Total Regulators',
      value: filteredRegs.length,
      change: 'No change',
      icon: Shield,
      trend: 'neutral',
    },
    {
      title: 'Total Admins',
      value: filteredAdmins.length,
      change: 'Requires attention',
      icon: ShieldUser,
      trend: 'warning',
    },
    {
      title: 'Pending Applications',
      value: sortedApplications.length,
      change: 'Requires attention',
      icon: AlertTriangle,
      trend: 'warning',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader title="Super Admin" subtitle="Welcome back, Damola" />

      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                {/* <div
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    stat.trend === "up"
                      ? "text-[#15941f]"
                      : stat.trend === "warning"
                        ? "text-yellow-500"
                        : "text-gray-400"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  {stat.change}
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#15941f]"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      New organization "TechCorp" created
                    </p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      Invite code regenerated for "FinanceInc"
                    </p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      Regulator "John Smith" added
                    </p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <CreateOrganizationDialog onCreate={createOrg} />
                <CreateRegulatorDialog onCreate={createReg} />
                <CreateAdmin onCreate={createAdmin} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
