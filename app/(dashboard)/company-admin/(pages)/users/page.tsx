/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Users,
  Search,
  Eye,
  RotateCcw,
  Calendar,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  UserX,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

type ActiveUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  dateJoined: string;
  organization: string;
  location: string;
  lastActive: string;
  totalTrips: number;
};

type DeletedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  deletedAt: string;
  deletedBy: string;
  reason?: string;
  organization: string;
  location: string;
  dateJoined: string;
  totalTrips: number;
};

/* -----------------------
   Mock data (typed)
   ----------------------- */
const activeUsers: ActiveUser[] = [
  {
    id: 'USR001',
    name: 'John Smith',
    email: 'john.smith@clinic.com',
    phone: '+234 123 456 7890',
    role: 'Client',
    status: 'Active',
    dateJoined: '2025-01-15',
    organization: 'Clinic ABC',
    location: 'Lagos, Nigeria',
    lastActive: '2025-08-23 14:30',
    totalTrips: 12,
  },
  {
    id: 'USR002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@driver.com',
    phone: '+234 987 654 3210',
    role: 'Driver',
    status: 'Active',
    dateJoined: '2025-02-20',
    organization: 'Logistics Corp',
    location: 'Abuja, Nigeria',
    lastActive: '2025-08-23 16:45',
    totalTrips: 45,
  },
  {
    id: 'USR003',
    name: 'Mike Davis',
    email: 'mike.davis@pharma.com',
    phone: '+234 555 123 4567',
    role: 'Client',
    status: 'Suspended',
    dateJoined: '2025-03-10',
    organization: 'PharmaCare Industries',
    location: 'Port Harcourt, Nigeria',
    lastActive: '2025-08-20 09:15',
    totalTrips: 8,
  },
  {
    id: 'USR004',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@driver.com',
    phone: '+234 444 567 8901',
    role: 'Driver',
    status: 'Active',
    dateJoined: '2025-01-05',
    organization: 'Logistics Corp',
    location: 'Kano, Nigeria',
    lastActive: '2025-08-23 12:20',
    totalTrips: 38,
  },
  {
    id: 'USR005',
    name: 'Tom Brown',
    email: 'tom.brown@waste.com',
    phone: '+234 333 789 0123',
    role: 'Client',
    status: 'Active',
    dateJoined: '2025-04-12',
    organization: 'WasteTech Solutions',
    location: 'Ibadan, Nigeria',
    lastActive: '2025-08-22 18:30',
    totalTrips: 15,
  },
];

const deletedUsersData: DeletedUser[] = [
  {
    id: 'USR006',
    name: 'Alex Chen',
    email: 'alex.chen@deleted.com',
    phone: '+234 222 345 6789',
    role: 'Driver',
    deletedAt: '2025-08-15 10:30',
    deletedBy: 'Admin User',
    reason: 'Policy violation - multiple missed trips',
    organization: 'Logistics Corp',
    location: 'Lagos, Nigeria',
    dateJoined: '2024-12-01',
    totalTrips: 22,
  },
  {
    id: 'USR007',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@deleted.com',
    phone: '+234 111 234 5678',
    role: 'Client',
    deletedAt: '2025-08-10 14:20',
    deletedBy: 'Admin User',
    reason: 'Account closure requested by user',
    organization: 'Healthcare Plus',
    location: 'Abuja, Nigeria',
    dateJoined: '2024-11-15',
    totalTrips: 6,
  },
  {
    id: 'USR008',
    name: 'David Kim',
    email: 'david.kim@deleted.com',
    phone: '+234 999 876 5432',
    role: 'Driver',
    deletedAt: '2025-08-05 16:45',
    deletedBy: 'Super Admin',
    reason: 'Duplicate account detected',
    organization: 'Logistics Corp',
    location: 'Port Harcourt, Nigeria',
    dateJoined: '2024-10-20',
    totalTrips: 3,
  },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState<string | null>(null);
  const [deletedUsers, setDeletedUsers] =
    useState<DeletedUser[]>(deletedUsersData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  type TabType = 'active' | 'deleted';

  // Filter active users
  const filteredActiveUsers: ActiveUser[] = activeUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'all' ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus =
      statusFilter === 'all' ||
      user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate =
      dateFilter === 'all' || user.dateJoined.startsWith(dateFilter);
    return matchesSearch && matchesRole && matchesStatus && matchesDate;
  });

  const filteredDeletedUsers: DeletedUser[] = deletedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'all' ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const currentUsers =
    activeTab === 'active' ? filteredActiveUsers : filteredDeletedUsers;

  const totalPages =
    activeTab === 'active'
      ? Math.ceil(filteredActiveUsers.length / usersPerPage)
      : Math.ceil(filteredDeletedUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedActiveUsers = filteredActiveUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const paginatedDeletedUsers = filteredDeletedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleRestoreUser = (userId: string) => {
    const userToRestore = deletedUsers.find((user) => user.id === userId);
    if (userToRestore) {
      // Remove from deleted users
      setDeletedUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success(
        `User ${userToRestore.name} has been restored successfully`
      );
    }
    setIsRestoreModalOpen(false);
    setUserToRestore(null);
  };

  const getRoleBadge = (role?: string) => {
    if (!role) return <Badge variant="outline">Unknown</Badge>;
    switch (role.toLowerCase()) {
      case 'client':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            <User className="h-3 w-3 mr-1" />
            Client
          </Badge>
        );
      case 'driver':
        return (
          <Badge variant="secondary" className="bg-green-600 text-white">
            <UserCheck className="h-3 w-3 mr-1" />
            Driver
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status?: string) => {
    // guard against undefined/null
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    switch (status.toLowerCase()) {
      case 'active':
        return (
          <Badge className="bg-[#15941f] text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title={'Users'}
        subtitle="Manage clients and drivers linked to your organization"
      />

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={(v: string) => {
                setActiveTab(v as TabType);
                setCurrentPage(1);
              }}
              className="w-full"
            >
              <div className="border-b border-gray-700 px-6">
                <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 max-w-md">
                  <TabsTrigger
                    value="active"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <UserCheck className="h-4 w-4" />
                    Active Users ({filteredActiveUsers.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="deleted"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <UserX className="h-4 w-4" />
                    Deleted Users ({filteredDeletedUsers.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name, email, or user ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                    </SelectContent>
                  </Select>
                  {activeTab === 'active' && (
                    <>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Date" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="all">All Dates</SelectItem>
                          <SelectItem value="2025-08">This Month</SelectItem>
                          <SelectItem value="2025-07">Last Month</SelectItem>
                          <SelectItem value="2025">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>
              </div>

              {/* Active Users Tab */}
              <TabsContent value="active" className="p-0">
                {filteredActiveUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No users found
                    </h3>
                    <p className="text-gray-400">
                      {searchTerm ||
                      roleFilter !== 'all' ||
                      statusFilter !== 'all'
                        ? 'No users match your current search and filter criteria.'
                        : 'No users found. Invite or onboard clients and drivers through Trips or Assignments.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border border-gray-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700 hover:bg-gray-800">
                            <TableHead className="text-gray-300">
                              User ID
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Name
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Email
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Role
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Status
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Date Joined
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedActiveUsers.map((user) => (
                            <TableRow
                              key={user.id}
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <TableCell className="font-medium text-white">
                                {user.id}
                              </TableCell>
                              <TableCell className="text-gray-300">
                                {user.name}
                              </TableCell>
                              <TableCell className="text-gray-300 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </TableCell>
                              <TableCell>{getRoleBadge(user.role)}</TableCell>
                              <TableCell>
                                {getStatusBadge(user.status)}
                              </TableCell>
                              <TableCell className="text-gray-300 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(user.dateJoined)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDetails(user)}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Deleted Users Tab */}
              <TabsContent value="deleted" className="p-0">
                {filteredDeletedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <UserX className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No deleted users
                    </h3>
                    <p className="text-gray-400">
                      {searchTerm || roleFilter !== 'all'
                        ? 'No deleted users match your current search criteria.'
                        : 'No deleted users at this time.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border border-gray-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700 hover:bg-gray-800">
                            <TableHead className="text-gray-300">
                              User ID
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Name
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Email
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Role
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Deleted At
                            </TableHead>
                            <TableHead className="text-gray-300">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedDeletedUsers.map((user) => (
                            <TableRow
                              key={user.id}
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <TableCell className="font-medium text-white">
                                {user.id}
                              </TableCell>
                              <TableCell className="text-gray-300">
                                {user.name}
                              </TableCell>
                              <TableCell className="text-gray-300 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </TableCell>
                              <TableCell>{getRoleBadge(user.role)}</TableCell>
                              <TableCell className="text-gray-300 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDateTime(user.deletedAt)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(user)}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setUserToRestore(user.id);
                                      setIsRestoreModalOpen(true);
                                    }}
                                    className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                                  >
                                    <RotateCcw className="h-3 w-3 mr-1" />
                                    Restore
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-6 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + usersPerPage, currentUsers.length)}{' '}
                    of {currentUsers.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* User Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Details - {selectedUser?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {activeTab === 'active'
                ? 'Active user information'
                : 'Deleted user information'}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">User ID</Label>
                      <p className="text-white font-medium">
                        {selectedUser.id}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">Full Name</Label>
                      <p className="text-white">{selectedUser.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Email Address
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {selectedUser.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Phone Number
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Account Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">Role</Label>
                      <div className="mt-1">
                        {getRoleBadge(selectedUser.role)}
                      </div>
                    </div>
                    {activeTab === 'active' && (
                      <div>
                        <Label className="text-gray-400 text-sm">Status</Label>
                        <div className="mt-1">
                          {getStatusBadge(selectedUser.status)}
                        </div>
                      </div>
                    )}
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Organization
                      </Label>
                      <p className="text-white">{selectedUser.organization}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">Location</Label>
                      <p className="text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedUser.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Activity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <Label className="text-gray-400 text-sm">Date Joined</Label>
                    <p className="text-white mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedUser.dateJoined)}
                    </p>
                  </div>
                  {activeTab === 'active' && (
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <Label className="text-gray-400 text-sm">
                        Last Active
                      </Label>
                      <p className="text-white mt-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(selectedUser.lastActive)}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <Label className="text-gray-400 text-sm">Total Trips</Label>
                    <p className="text-white mt-1 text-2xl font-bold">
                      {selectedUser.totalTrips}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deletion Information (for deleted users) */}
              {activeTab === 'deleted' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Deletion Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Deleted At
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(selectedUser.deletedAt)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Deleted By
                      </Label>
                      <p className="text-white">{selectedUser.deletedBy}</p>
                    </div>
                    {selectedUser.reason && (
                      <div>
                        <Label className="text-gray-400 text-sm">Reason</Label>
                        <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 mt-1">
                          <p className="text-gray-300 text-sm">
                            {selectedUser.reason}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Restore User Confirmation */}
      <AlertDialog
        open={isRestoreModalOpen}
        onOpenChange={setIsRestoreModalOpen}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-400">
              <RotateCcw className="h-5 w-5" />
              Restore User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to restore this user? They will regain
              access to their account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToRestore && handleRestoreUser(userToRestore)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
