'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from './useRequest';
import axios from 'axios';

type User = {
  id: string;
  short_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  dateJoined: string;
  location: string;
  lastActive: string;
  totalTrips: number;
};

interface DeletedUser {
  id: string;
  short_id: string;
  code: string;
  name: string;
  email: string;
  role: string;
  deleted_at: string;
  deletion_reason: string;
}

export function useUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<DeletedUser[]>([]);
  const [activeTab, setActiveTab] = useState<
    'users' | 'deleted' | 'medilogic-drivers'
  >('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState<string | null>(null);
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const authorizedRequest = useAuthorizedRequest();

  const roleOrder: Record<string, number> = {
    admin: 1,
    driver: 2,
    client: 3,
  };

  const sorted = users.sort((a, b) => {
    const roleRankA = roleOrder[a.role.toLowerCase()] || 99;
    const roleRankB = roleOrder[b.role.toLowerCase()] || 99;

    if (roleRankA !== roleRankB) {
      return roleRankA - roleRankB; // prioritize by role order
    }

    // fallback: alphabetical by name
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    authorizedRequest(async (token) => {
      const [driversRes, clientsRes] = await Promise.all([
        axios.get('https://medilogic-backend.onrender.com/admin/users', {
          params: { role: 'driver', limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('https://medilogic-backend.onrender.com/admin/users', {
          params: { role: 'client', limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const mapped: User[] = [...driversRes.data, ...clientsRes.data].map(
        (u: any) => ({
          id: u.id,
          short_id: u.short_id,
          name: u.name,
          email: u.email,
          phone: u.phone_number || '',
          role: u.role,
          status: u.is_active ? 'active' : 'inactive',
          dateJoined: u.created_at ? u.created_at.split('T')[0] : '',
          location: u.address || '',
          lastActive: '-',
          totalTrips: 0,
        })
      );

      if (isMounted)
        setUsers(
          mapped.sort((a, b) => {
            const roleRankA = roleOrder[a.role.toLowerCase()] || 99;
            const roleRankB = roleOrder[b.role.toLowerCase()] || 99;

            if (roleRankA !== roleRankB) {
              return roleRankA - roleRankB;
            }
            return a.name.localeCompare(b.name);
          })
        );
    }, 'Failed to fetch users').finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  const filteredUsers: User[] = users.filter((user) => {
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

  const handleDeactivateUser = async (userId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await axios.patch(
          `https://medilogic-backend.onrender.com/admin/users/${userId}/deactivate`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          toast.success('User deactivated successfully');

          // update local state so UI reflects change
          setUsers((prev) =>
            prev.map((u) =>
              u.id === userId ? { ...u, status: 'inactive' } : u
            )
          );
        }
      }, 'Failed to deactivate user');
    } catch (err: unknown) {
      let message = 'Failed to deactivate user';
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { msg?: string; detail?: string })?.msg ||
          (err.response?.data as { msg?: string; detail?: string })?.detail ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error('Error deactivating user', { description: message });
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await axios.patch(
          `https://medilogic-backend.onrender.com/admin/users/${userId}/activate`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          toast.success('User activated successfully');

          // update local state so UI reflects change
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, status: 'active' } : u))
          );
        }
      }, 'Failed to activate user');
    } catch (err: unknown) {
      let message = 'Failed to activate user';
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { msg?: string; detail?: string })?.msg ||
          (err.response?.data as { msg?: string; detail?: string })?.detail ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error('Error activating user', { description: message });
    }
  };

  useEffect(() => {
    let isMounted = true;

    authorizedRequest(async (token) => {
      const res = await axios.get<DeletedUser[]>(
        'https://medilogic-backend.onrender.com/users/users/users/deleted',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const mapped = res.data.map((u: any) => ({
        ...u,
      }));

      mapped.sort((a, b) => a.name.localeCompare(b.name));

      if (isMounted) setDeletedUsers(mapped);
    }, 'Failed to fetch deleted users');

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  const filteredDeletedUsers: DeletedUser[] = deletedUsers.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'all' ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const paginatedDeletedUsers = filteredDeletedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const currentUsers =
    activeTab === 'users' ? filteredUsers : filteredDeletedUsers;

  const totalPages = Math.ceil(currentUsers.length / usersPerPage);

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleRestoreUser = async (uuid: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await axios.patch(
          `https://medilogic-backend.onrender.com/users/users/users/${uuid}/restore`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          toast.success(`User has been restored successfully`);
          setDeletedUsers((prev) => prev.filter((u) => u.id !== uuid));
        }
      }, 'Failed to restore user');
    } catch (err: unknown) {
      let message = 'Failed to restore user';
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { msg?: string; detail?: string })?.msg ||
          (err.response?.data as { msg?: string; detail?: string })?.detail ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error('Error restoring user:', { description: message });
    } finally {
      setIsRestoreModalOpen(false);
    }
  };

  return {
    loading,
    users,
    deletedUsers,
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
    filteredUsers,
    handleDeactivateUser,
    handleActivateUser,
    filteredDeletedUsers,
    currentUsers,
    totalPages,
    startIndex,
    paginatedUsers,
    paginatedDeletedUsers,
    handleViewDetails,
    handleRestoreUser,
  };
}
