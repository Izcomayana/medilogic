'use client';

import { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

type PendingDriver = {
  id: string;
  name: string;
  email: string;
  submittedDate: string;
  status: 'pending';
};

type ApprovedDriver = {
  id: string;
  name: string;
  email: string;
  approvedDate: string;
  status: 'approved';
};

type Driver = PendingDriver | ApprovedDriver;

const driverStats = [
  {
    title: 'Total Drivers',
    value: '48',
    change: '+5 this month',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Pending Approval',
    value: '7',
    change: 'Requires attention',
    icon: Clock,
    trend: 'warning',
  },
  {
    title: 'Approved',
    value: '38',
    change: '+3 this month',
    icon: CheckCircle,
    trend: 'up',
  },
  {
    title: 'Rejected',
    value: '3',
    change: 'This month',
    icon: AlertCircle,
    trend: 'neutral',
  },
];

const pendingDrivers: PendingDriver[] = [
  {
    id: 'MDR001',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    submittedDate: '2024-01-15',
    status: 'pending',
  },
  {
    id: 'MDR002',
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    submittedDate: '2024-01-14',
    status: 'pending',
  },
  {
    id: 'MDR003',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    submittedDate: '2024-01-13',
    status: 'pending',
  },
];

const approvedDrivers: ApprovedDriver[] = [
  {
    id: 'MDR010',
    name: 'John Smith',
    email: 'john.smith@email.com',
    approvedDate: '2024-01-10',
    status: 'approved',
  },
  {
    id: 'MDR011',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    approvedDate: '2024-01-09',
    status: 'approved',
  },
  {
    id: 'MDR012',
    name: 'David Martinez',
    email: 'david.martinez@email.com',
    approvedDate: '2024-01-08',
    status: 'approved',
  },
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([
    ...pendingDrivers,
    ...approvedDrivers,
  ]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleApprove = (driverId: string) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === driverId && d.status === 'pending' ? approveDriver(d) : d
      )
    );

    toast.success('Driver approved successfully');
    setShowDetailsModal(false);
  };

  const approveDriver = (d: PendingDriver): ApprovedDriver => ({
    id: d.id,
    name: d.name,
    email: d.email,
    status: 'approved',
    approvedDate: new Date().toISOString().split('T')[0],
  });

  const handleReject = (driverId: string) => {
    setDrivers(drivers.filter((d) => d.id !== driverId));
    toast.success('Driver rejected');
    setShowDetailsModal(false);
  };

  const viewDriver = (driver: any) => {
    setSelectedDriver(driver);
    setShowDetailsModal(true);
  };

  const pendingList = drivers.filter(
    (d): d is PendingDriver => d.status === 'pending'
  );

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
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Driver ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Submitted
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingList.map((driver) => (
                    <tr
                      key={driver.id}
                      className="border-b border-gray-700 hover:bg-gray-800"
                    >
                      <td className="py-3 px-4 text-gray-300">{driver.id}</td>
                      <td className="py-3 px-4 text-white">{driver.name}</td>
                      <td className="py-3 px-4 text-gray-400">
                        {driver.email}
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {driver.submittedDate}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => viewDriver(driver)}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Driver ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Approved Date
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drivers
                    .filter((d) => d.status === 'approved')
                    .map((driver) => (
                      <tr
                        key={driver.id}
                        className="border-b border-gray-700 hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 text-gray-300">{driver.id}</td>
                        <td className="py-3 px-4 text-white">{driver.name}</td>
                        <td className="py-3 px-4 text-gray-400">
                          {driver.email}
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {driver.approvedDate}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs bg-[#15941f] text-white">
                            Approved
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Driver Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Driver ID</label>
                <p className="text-white font-medium">{selectedDriver.id}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400">Full Name</label>
                <p className="text-white font-medium">{selectedDriver.name}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400">Email</label>
                <p className="text-white font-medium">{selectedDriver.email}</p>
              </div>
              {selectedDriver.status === 'approved' && (
                <div>
                  <label className="text-xs text-gray-400">
                    Submitted Date
                  </label>
                  <p>{selectedDriver.approvedDate}</p>
                </div>
              )}
              {selectedDriver.status === 'pending' && (
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => handleReject(selectedDriver.id)}
                    className="flex-1 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedDriver.id)}
                    className="flex-1 px-4 py-2 rounded bg-[#15941f] hover:bg-green-700 text-white text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-4 py-2 rounded border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm font-medium"
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
