/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Admin } from '@/app/(dashboard)/super-admin/(pages)/admins/type/admin';
import { useAuthorizedRequest } from '@/hooks/useRequest';

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('All Organizations');
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const authorizedRequest = useAuthorizedRequest();

  // fetch admins
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    authorizedRequest(async (validToken) => {
      const res = await axios.get(
        'https://medilogic-backend.onrender.com/super/',
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

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
      if (isMounted) setAdmin(mapped);
    }, 'Failed to fetch admins').finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

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
    await authorizedRequest(async (validToken) => {
      const res = await axios.post(
        'https://medilogic-backend.onrender.com/super/super/admins',
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
    }, 'Failed to create admin');
  };

  // activate admin
  const activateAdmin = async (adminId: string) => {
    setLoadingAction(true);
    await authorizedRequest(async (validToken) => {
      await axios.patch(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}/activate`,
        {},
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      setAdmin((prev) =>
        prev.map((a) => (a.id === adminId ? { ...a, status: 'active' } : a))
      );
      setEditOpen(false);
      setEditAdmin(null);
      toast.success('Admin activated successfully');
    }, 'Failed to activate admin');
    setLoadingAction(false);
  };

  // deactivate admin
  const deactivateAdmin = async (adminId: string) => {
    setLoadingAction(true);
    await authorizedRequest(async (validToken) => {
      await axios.patch(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      setAdmin((prev) =>
        prev.map((a) => (a.id === adminId ? { ...a, status: 'inactive' } : a))
      );
      setEditOpen(false);
      setEditAdmin(null);
      toast.success('Admin deactivated successfully');
    }, 'Failed to deactivate admin');
    setLoadingAction(false);
  };

  // delete admin
  const deleteAdmin = async (adminId: string) => {
    await authorizedRequest(async (validToken) => {
      await axios.delete(
        `https://medilogic-backend.onrender.com/super/super/users/${adminId}`,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      setAdmin((prev) => prev.filter((a) => a.id !== adminId));
      toast.success('Admin permanently deleted 🗑️');
    }, 'Failed to delete admin');
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
