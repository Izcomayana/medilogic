'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type ActiveUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Active' | 'Suspended';
  dateJoined: string;
  organization: string;
  location: string;
  lastActive: string;
  totalTrips: number;
};

type InactiveUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Inactive';
  dateJoined: string;
  organization: string;
  location: string;
  lastActive?: string;
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
];

const inactiveUsers: InactiveUser[] = [
  {
    id: 'USR009',
    name: 'Grace Lee',
    email: 'grace.lee@inactive.com',
    phone: '+234 777 123 4567',
    role: 'Client',
    status: 'Inactive',
    dateJoined: '2025-01-10',
    organization: 'MediHealth',
    location: 'Kano, Nigeria',
    totalTrips: 0,
  },
  {
    id: 'USR010',
    name: 'James Bond',
    email: 'james.bond@inactive.com',
    phone: '+234 888 654 3210',
    role: 'Driver',
    status: 'Inactive',
    dateJoined: '2025-03-05',
    organization: 'TransportX',
    location: 'Ibadan, Nigeria',
    totalTrips: 12,
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
];

export function useUsers() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'deleted'>(
    'active'
  );
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
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* -----------------------
     Filtering
     ----------------------- */
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

  const filteredInactiveUsers: InactiveUser[] = inactiveUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'all' ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
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

  /* -----------------------
     Pagination
     ----------------------- */
  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedActiveUsers = filteredActiveUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const paginatedInactiveUsers = filteredInactiveUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const paginatedDeletedUsers = filteredDeletedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const currentUsers =
    activeTab === 'active'
      ? filteredActiveUsers
      : activeTab === 'inactive'
        ? filteredInactiveUsers
        : filteredDeletedUsers;

  const totalPages = Math.ceil(currentUsers.length / usersPerPage);

  /* -----------------------
     Handlers
     ----------------------- */
  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleRestoreUser = (userId: string) => {
    const userToRestore = deletedUsers.find((user) => user.id === userId);
    if (userToRestore) {
      setDeletedUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success(
        `User ${userToRestore.name} has been restored successfully`
      );
    }
    setIsRestoreModalOpen(false);
    setUserToRestore(null);
  };

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    selectedUser,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isRestoreModalOpen,
    setIsRestoreModalOpen,
    userToRestore,
    setUserToRestore,
    currentPage,
    setCurrentPage,
    usersPerPage,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
    currentUsers,
    totalPages,
    startIndex,
    paginatedActiveUsers,
    paginatedInactiveUsers,
    paginatedDeletedUsers,
    handleViewDetails,
    handleRestoreUser,
  };
}
