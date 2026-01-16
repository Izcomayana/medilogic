'use client';

import { useEffect, useState } from "react"
import axios from "axios"
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";

export type BackendDriver = {
  id: string
  short_id: string
  created_at: string
  updated_at: string
  is_active: boolean
  is_verified: boolean
  name: string
  email: string
  phone_number: string
  country: string
  state: string
  region: string
  address: string
  zip_code: string
  license_number: string
  license_expiry: string
  vehicle_type: string
  preferred_role: string
  experience_years: number
  status: "submitted" | "approved" | "rejected"
  subscription_status: string
  subscription_plan: string
  badge_type: string
}

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

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const authorizedRequest = useAuthorizedRequest();

  const mapBackendDriverToUI = (d: BackendDriver): Driver | null => {
  if (d.status === "submitted") {
    return {
      id: d.short_id || d.id,
      name: d.name,
      email: d.email,
      status: "pending",
      submittedDate: d.created_at.split("T")[0],
    }
  }

  if (d.status === "approved") {
    return {
      id: d.short_id || d.id,
      name: d.name,
      email: d.email,
      status: "approved",
      approvedDate: d.updated_at.split("T")[0],
    }
  }

  // Ignore rejected for now (or handle later)
  return null
}

useEffect(() => {
  const fetchDrivers = async () => {
    try {
      await authorizedRequest(async (token) => {
              const res = await axios.get<BackendDriver[]>(
        "https://medilogic-backend.onrender.com/Medilogic_drivers/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      )

      const mappedDrivers = res.data
        .map(mapBackendDriverToUI)
        .filter((d): d is Driver => d !== null)

      setDrivers(mappedDrivers)
      }, 'failed to get drivers')
    } catch (error) {
      toast.error("Failed to fetch drivers")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  fetchDrivers()
}, [])

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
  (d): d is PendingDriver => d.status === "pending"
)

{loading && (
  <div className="text-center py-10 text-gray-400">
    Loading drivers...
  </div>
)}

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
                      <TableCell className="py-3 px-4 text-gray-300">{driver.id}</TableCell>
                      <TableCell className="py-3 px-4 text-white">{driver.name}</TableCell>
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
                        <TableCell className="py-3 px-4 text-gray-300">{driver.id}</TableCell>
                        <TableCell className="py-3 px-4 text-white">{driver.name}</TableCell>
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
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
                <Label className="text-xs text-gray-400">Driver ID</Label>
                <p className="text-white font-medium">{selectedDriver.id}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-400">Full Name</Label>
                <p className="text-white font-medium">{selectedDriver.name}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-400">Email</Label>
                <p className="text-white font-medium">{selectedDriver.email}</p>
              </div>
              {selectedDriver.status === 'approved' && (
                <div>
                  <Label className="text-xs text-gray-400">
                    Submitted Date
                  </Label>
                  <p>{selectedDriver.approvedDate}</p>
                </div>
              )}
              {selectedDriver.status === 'pending' && (
                <div className="flex gap-2 mt-6">
                  <Button
                    onClick={() => handleReject(selectedDriver.id)}
                    className="flex-1 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedDriver.id)}
                    className="flex-1 px-4 py-2 rounded bg-[#15941f] hover:bg-green-700 text-white text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}

              <Button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-4 py-2 rounded border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm font-medium"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
