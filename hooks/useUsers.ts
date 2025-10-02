'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from './useRequest';

<<<<<<< HEAD
export type ActiveUser = {
=======
type User = {
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43
  id: string;
  name: string;
  email: string;
  role: string;
<<<<<<< HEAD
  status: string; // 'active' | 'inactive'
  dateJoined: string;
};

export type InactiveUser = ActiveUser;
export type DeletedUser = ActiveUser;

export function useUsers() {
  const authorizedRequest = useAuthorizedRequest();

  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<InactiveUser[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<DeletedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'deleted'>(
    'active'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
=======
  status: 'active' | 'inactive';
  dateJoined: string;
  location: string;
  lastActive: string;
  totalTrips: number;
};

interface DeletedUser {
  id: string;
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
  const [activeTab, setActiveTab] = useState<'users' | 'deleted'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState<string | null>(null);
  const usersPerPage = 10;
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

<<<<<<< HEAD
  type ApiUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
  };

  const normalizeUser = useCallback(
    (user: ApiUser): ActiveUser => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.is_active ? 'active' : 'inactive',
      dateJoined: user.created_at,
    }),
    []
  );

  // Fetch active users
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    authorizedRequest(async (validToken) => {
      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/admin/users',
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );
        if (isMounted) setActiveUsers(res.data.map(normalizeUser));
      } catch {
        if (isMounted) setError('Failed to fetch active users');
      } finally {
        if (isMounted) setLoading(false);
=======
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
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43
      }
    }, 'Failed to fetch active users');

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest, normalizeUser]);

  // Fetch deleted users
  const fetchDeletedUsers = useCallback(() => {
    setLoading(true);
    authorizedRequest(async (token) => {
      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/users/users/users/deleted',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDeletedUsers(res.data.map(normalizeUser));
      } catch {
        setError('Failed to fetch deleted users');
      } finally {
        setLoading(false);
      }
    }, 'Failed to fetch deleted users');
  }, [authorizedRequest, normalizeUser]);

  useEffect(() => {
    fetchDeletedUsers();
  }, [fetchDeletedUsers]);

  // Restore deleted user
  const restoreUser = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await authorizedRequest(async (token) => {
          await axios.patch(
            `https://medilogic-backend.onrender.com/users/${id}/restore`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }, 'Failed to restore user');

        fetchDeletedUsers();
      } catch {
        setError('Failed to restore user');
      } finally {
        setLoading(false);
      }
    },
    [authorizedRequest, fetchDeletedUsers]
  );

  // Deactivate active user
  const deactivateUser = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await authorizedRequest(async (token) => {
          await axios.patch(
            `https://medilogic-backend.onrender.com/admin/users/${id}/deactivate`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }, 'Failed to deactivate user');

        setActiveUsers((prevActive) => {
          const user = prevActive.find((u) => u.id === id);
          if (!user) return prevActive;

          setInactiveUsers((prevInactive) => [
            ...prevInactive,
            { ...user, status: 'inactive' },
          ]);
          return prevActive.filter((u) => u.id !== id);
        });
      } catch {
        setError('Failed to deactivate user');
      } finally {
        setLoading(false);
      }
    },
    [authorizedRequest]
  );

  // Activate inactive user
  const activateUser = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await authorizedRequest(async (token) => {
          await axios.patch(
            `https://medilogic-backend.onrender.com/admin/users/${id}/activate`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }, 'Failed to activate user');

        setInactiveUsers((prevInactive) => {
          const user = prevInactive.find((u) => u.id === id);
          if (!user) return prevInactive;

          setActiveUsers((prevActive) => [
            ...prevActive,
            { ...user, status: 'active' },
          ]);
          return prevInactive.filter((u) => u.id !== id);
        });
      } catch {
        setError('Failed to activate user');
      } finally {
        setLoading(false);
      }
    },
    [authorizedRequest]
  );

  // Filters
  const filterUsers = useCallback(
    <T extends ActiveUser>(users: T[]) =>
      users.filter(
        (u) =>
          (!searchTerm ||
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!roleFilter || u.role === roleFilter) &&
          (!statusFilter || u.status === statusFilter)
      ),
    [searchTerm, roleFilter, statusFilter]
  );

  const filteredActiveUsers = useMemo(
    () => filterUsers(activeUsers),
    [activeUsers, filterUsers]
  );
  const filteredInactiveUsers = useMemo(
    () => filterUsers(inactiveUsers),
    [inactiveUsers, filterUsers]
  );
  const filteredDeletedUsers = useMemo(
    () => filterUsers(deletedUsers),
    [deletedUsers, filterUsers]
  );

  // Pagination
  const currentUsers = useMemo(() => {
    let list: ActiveUser[] = [];
    if (activeTab === 'active') list = filteredActiveUsers;
    if (activeTab === 'inactive') list = filteredInactiveUsers;
    if (activeTab === 'deleted') list = filteredDeletedUsers;

    const start = (currentPage - 1) * usersPerPage;
    return list.slice(start, start + usersPerPage);
  }, [
    activeTab,
    currentPage,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
  ]);

  const totalPages = Math.ceil(currentUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;

  return {
<<<<<<< HEAD
    activeUsers,
    inactiveUsers,
    deletedUsers,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
    currentUsers,
=======
    loading,
    users,
    deletedUsers,
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
<<<<<<< HEAD
    currentPage,
    setCurrentPage,
    usersPerPage,
    totalPages,
    startIndex,
    loading,
    error,
    restoreUser,
    deactivateUser,
    activateUser,
=======
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
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43
  };
}
