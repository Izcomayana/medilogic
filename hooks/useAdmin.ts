/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Admin } from '@/app/(dashboard)/super-admin/(pages)/admins/type/admin';
import { useAuth } from '@/components/auth';
import { isTokenExpired } from '@/hooks/token';

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('All Organizations');
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // fetch admins
  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchRegs = async () => {
      setLoading(true);
      let validToken = token;

      if (isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return;
        validToken = refreshed;
      }

      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/super/',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        if (!isMounted) return;

        type RegApi = {
          id: string;
          name: string;
          email: string;
          is_active: boolean;
          organization_name: string;
        };

        const mapped: Admin[] = (res.data as RegApi[]).map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          status: r.is_active ? 'active' : 'inactive',
          orgName: r.organization_name,
        }));

        mapped.sort((a, b) => a.name.localeCompare(b.name));
        setAdmin(mapped);
      } catch (err: any) {
        const detail = err?.response?.data?.detail;
        const msg = Array.isArray(detail)
          ? detail.map((d: any) => d.msg).join(' • ')
          : detail || err.message || 'Failed to fetch organization';
        toast.error(msg);
        throw err;
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRegs();
    return () => {
      isMounted = false;
    };
  }, [token, refreshAccessToken]);

  // Filtered admins
  const filteredAdmins = admin.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg =
      selectedAdmin === 'All Organizations' || a.orgName === selectedAdmin;
    const matchesStatus =
      statusFilter === 'all' ||
      a.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesOrg && matchesStatus;
  });

  // Create Admin
  const createAdmin = async (adminData: any) => {
    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error('Authentication expired. Please log in again.');
          return;
        }
        validToken = refreshed;
      }

      const res = await axios.post(
        'https://medilogic-backend.onrender.com/super/create-user',
        {
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
          status: adminData.is_active,
          role: adminData.role,
          organization_id: adminData.organization_id,
        },
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setAdmin((prev) => [
        ...prev,
        {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          role: res.data.role,
          orgId: res.data.organization_id,
          status: res.data.is_active ? 'active' : 'inactive',
        },
      ]);

      toast.success('User created successfully');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: any) => d.msg).join(' • ')
        : detail || err.message || 'Failed to create user';
      toast.error(msg);
      throw err;
    }
  };

  //  activate admin
  const activateAdmin = async (adminId: string) => {
    setLoadingAction(true);
    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error('Authentication expired. Please log in again.');
          return;
        }
        validToken = refreshed;
      }

      const res = await axios.patch(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}/activate`,
        {},
        {
          headers: { Authorization: `Bearer ${validToken}` },
        }
      );

      // Update local state (mark org as active)
      setAdmin((prev) =>
        prev.map((a) => (a.id === adminId ? { ...a, status: 'active' } : a))
      );

      setEditOpen(false);
      setEditAdmin(null);
      toast.success('admin activated successfully');
    } catch (err: any) {
      console.error('Failed to activate admin:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to activate admin';
      toast.error(msg);
    } finally {
      setLoadingAction(false);
    }
  };

  // deactivate admin
  const deactivateAdmin = async (adminId: string) => {
    setLoadingAction(true);
    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error('Authentication expired. Please log in again.');
          return;
        }
        validToken = refreshed;
      }

      await axios.patch(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}/deactivate`,
        {},
        {
          headers: { Authorization: `Bearer ${validToken}` },
        }
      );

      setAdmin((prev) =>
        prev.map((a) => (a.id === adminId ? { ...a, status: 'inactive' } : a))
      );
      setEditOpen(false);
      setEditAdmin(null);
      toast.success('Admin deactivated successfully');
    } catch (err: any) {
      console.error('Failed to deactivate admin:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to deactivate admin';
      toast.error(msg);
    } finally {
      setLoadingAction(false);
    }
  };

  // delete admin
  const deleteAdmin = async (adminId: string) => {
    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error('Authentication expired. Please log in again.');
          return;
        }
        validToken = refreshed;
      }

      await axios.delete(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}`,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      // ✅ Just remove locally, don’t refetch whole list
      setAdmin((prev) => prev.filter((a) => a.id !== adminId));

      toast.success('Admin permanently deleted 🗑️');
    } catch (err: any) {
      console.error('Failed to delete admin:', err);
      const msg =
        err?.response?.data?.detail || err.message || 'Failed to delete admin';
      toast.error(msg);
    }
  };

  return {
    admin,
    loading,
    loadingAction,
    editOpen,
    setEditOpen,
    filteredAdmins,
    createAdmin,
    searchTerm,
    setSearchTerm,
    selectedAdmin,
    setSelectedAdmin,
    editAdmin,
    setEditAdmin,
    statusFilter,
    setStatusFilter,
    activateAdmin,
    deactivateAdmin,
    deleteAdmin,
  };
}
