'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useDrivers } from '@/hooks/useDrivers';
import { Driver } from '@/app/(dashboard)/components/SingleDriver';

export default function DriversPage() {
  const {
    drivers,
    loading,
    pendingList,
    viewDriver,
    detailsOpen,
    setDetailsOpen,
    selectedDriver,
    handleApprove,
    handleReject,
  } = useDrivers();

  const totalDrivers = drivers.length;
  const pendingCount = pendingList.length;
  const approvedCount = drivers.filter((d) => d.status === 'approved').length;
  const rejectedCount = 0;

  const driverStats = [
    {
      title: 'Total Drivers',
      value: totalDrivers,
      change: 'All drivers',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Pending Approval',
      value: pendingCount,
      change: 'Requires attention',
      icon: Clock,
      trend: pendingCount > 0 ? 'warning' : 'up',
    },
    {
      title: 'Approved',
      value: approvedCount,
      change: 'Active drivers',
      icon: CheckCircle,
      trend: 'up',
    },
    {
      title: 'Rejected',
      value: rejectedCount,
      change: 'Not approved',
      icon: AlertCircle,
      trend: 'neutral',
    },
  ];

  {
    loading && (
      <div className="text-center py-10 text-gray-400">Loading drivers...</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Medilogic Drivers Management"
        subtitle="Approve and manage Medilogic driver applications"
      />

      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {driverStats.map((stat, index) => (
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
                <div
                  className={`text-xs flex items-center gap-1 mt-1 ${stat.trend === 'up' ? 'text-[#15941f]' : stat.trend === 'warning' ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Drivers Table */}
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              Pending Approvals ({pendingList.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full text-sm">
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Driver ID
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Name
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Email
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Submitted
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingList.map((driver) => (
                    <TableRow
                      key={driver.id}
                      className="border-b border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="py-3 px-4 text-gray-300">
                        {driver.id}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-white">
                        {driver.name}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-400">
                        {driver.email}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-400">
                        {driver.submittedDate}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <Button
                          onClick={() => viewDriver(driver)}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {pendingList.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No pending driver approvals
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approved Drivers Table */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">
              Approved Drivers (
              {drivers.filter((d) => d.status === 'approved').length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full text-sm">
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Driver ID
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Name
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Email
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Approved Date
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-left py-3 px-4 text-gray-400 font-medium">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers
                    .filter((d) => d.status === 'approved')
                    .map((driver) => (
                      <TableRow
                        key={driver.id}
                        className="border-b border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell className="py-3 px-4 text-gray-300">
                          {driver.id}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-white">
                          {driver.name}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-400">
                          {driver.email}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-400">
                          {driver.approvedDate}
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs bg-[#15941f] text-white">
                            Approved
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <Button
                            onClick={() => viewDriver(driver)}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Driver
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        driver={selectedDriver}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
