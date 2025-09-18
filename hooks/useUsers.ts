'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from './useRequest';

export type ActiveUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string; // ✅ derived from is_active
  dateJoined: string; // ✅ from created_at
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

  // 🔹 UI State
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'deleted'>(
    'active'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  /**
   * ✅ Normalizer: Convert API → frontend shape
   */
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

  /**
   * ✅ Fetch Active Users from API
   */
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    authorizedRequest(async (validToken) => {
      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/admin/users',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );
        if (isMounted) {
          const normalized = res.data.map(normalizeUser);
          setActiveUsers(normalized);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError('Failed to fetch active users');
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 'Failed to fetch active users');

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest, normalizeUser]);

  /**
   * 🟡 Mock Inactive Users (can be replaced with API)
   */
  useEffect(() => {
    setInactiveUsers([
      {
        id: '201',
        name: 'Mock Inactive User',
        email: 'inactive@example.com',
        role: 'user',
        status: 'inactive',
        dateJoined: '2023-03-10',
      },
    ]);
  }, []);

  /**
   * ✅ Fetch Deleted Users from API
   */
  const fetchDeletedUsers = useCallback(() => {
    setLoading(true);

    authorizedRequest(async (validToken) => {
      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/users/users/users/deleted',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );
        const normalized = res.data.map(normalizeUser);
        setDeletedUsers(normalized);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch deleted users');
      } finally {
        setLoading(false);
      }
    }, 'Failed to fetch deleted users');
  }, [authorizedRequest, normalizeUser]);

  useEffect(() => {
    fetchDeletedUsers();
  }, [fetchDeletedUsers]);

  /**
   * ✅ Restore Deleted User
   */
  const restoreUser = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await authorizedRequest(async (token) => {
          await axios.patch(
            `https://medilogic-backend.onrender.com/users/${id}/restore`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }, 'Failed to restore user');

        fetchDeletedUsers();
      } catch (err) {
        console.error(err);
        setError('Failed to restore user');
      } finally {
        setLoading(false);
      }
    },
    [authorizedRequest, fetchDeletedUsers]
  );

  /**
   * ✅ Deactivate Active User
   */
  const deactivateUser = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await authorizedRequest(async (validToken) => {
          await axios.patch(
            `https://medilogic-backend.onrender.com/admin/users/${id}/deactivate`,
            {},
            { headers: { Authorization: `Bearer ${validToken}` } }
          );
        }, 'Failed to deactivate user');

        // Move user from active → inactive
        setActiveUsers((prev) => prev.filter((u) => u.id !== id));
        setInactiveUsers((prev) => [
          ...prev,
          {
            ...(activeUsers.find((u) => u.id === id) as ActiveUser),
            status: 'inactive',
          },
        ]);
      } catch (err) {
        console.error(err);
        setError('Failed to deactivate user');
      } finally {
        setLoading(false);
      }
    },
    [authorizedRequest, activeUsers]
  );

  /**
   * 🔎 Filters
   */
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

  /**
   * 📖 Pagination
   */
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
    // Data
    activeUsers,
    inactiveUsers,
    deletedUsers,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
    currentUsers,

    // UI State
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

    // Helpers
    loading,
    error,
    restoreUser,
    deactivateUser, // ✅ expose deactivate
  };
}
