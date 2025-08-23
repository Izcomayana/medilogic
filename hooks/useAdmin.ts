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
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<Admin | null>();

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

  return {
    admin,
    loading,
    createAdmin,
  };
}
