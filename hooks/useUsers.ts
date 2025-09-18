'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from './useRequest';

export type ActiveUser = {
  id: string;
  name: string;
  email: string;
  role: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
    activeUsers,
    inactiveUsers,
    deletedUsers,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
    currentUsers,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
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
  };
}
