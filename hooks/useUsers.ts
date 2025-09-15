'use client';

import { useState } from 'react';
import { toast } from 'sonner';

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

export function useUsers() {
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
    filteredDeletedUsers,
    currentUsers,
    totalPages,
    startIndex,
    paginatedActiveUsers,
    paginatedDeletedUsers,
    handleViewDetails,
    handleRestoreUser,
  };
}
