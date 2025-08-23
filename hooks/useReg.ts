/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Regulators } from '../app/(dashboard)/super-admin/(pages)/regulators/types/regulator';
import { useAuth } from '@/components/auth';
import { isTokenExpired } from '@/hooks/token';

export function useRegulators() {
  const [regs, setRegs] = useState<Regulators[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Regulators | null>(null);

  // fecth regulators
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
          'https://medilogic-backend.onrender.com/super/super/regulators',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        if (!isMounted) return;

        type RegApi = {
          id: string;
          name: string;
          email: string;
          is_active: boolean;
          regulated_region: string;
          regulated_country: string;
        };

        const mapped: Regulators[] = (res.data as RegApi[]).map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          status: r.is_active ? 'active' : 'inactive',
          regCountry: r.regulated_country,
          regRegion: r.regulated_region,
        }));

        mapped.sort((a, b) => a.name.localeCompare(b.name));
        setRegs(mapped);
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

  // Filtered orgs
  const filteredRegs = useMemo(() => {
    return regs.filter((reg) => {
      const matchesSearch =
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.regRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.regCountry.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === 'all') return matchesSearch;
      return (
        matchesSearch &&
        reg.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    });
  }, [regs, searchTerm, statusFilter]);

  // Create Regulator
  const createReg = async (regData: any) => {
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
        'https://medilogic-backend.onrender.com/super/super/regulators',
        {
          name: regData.name,
          email: regData.email,
          password: regData.password,
          status: regData.status,
          regulated_country: regData.country,
          regulated_state: regData.state,
          regulated_region: regData.region,
        },
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setRegs((prev) => [
        ...prev,
        {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          status: res.data.is_active ? 'active' : 'inactive',
          regRegion: res.data.regulated_region,
          regCountry: res.data.regulated_country,
          regState: res.data.regulated_state,
        },
      ]);

      toast.success('Regulator created successfully');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: any) => d.msg).join(' • ')
        : detail || err.message || 'Failed to create regulator';
      toast.error(msg);
      throw err;
    }
  };

  // View Regulator
  const viewReg = async (reg: Regulators) => {
    const regId = reg.id;

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

      const res = await axios.get(
        `https://medilogic-backend.onrender.com/super/admin/regulators/${regId}`,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      const data = res.data;

      const mappedReg: Regulators = {
        id: data.id,
        name: data.name,
        email: data.email,
        status: data.is_active ? 'active' : 'inactive',
        role: data.role,
        phone: data.phone,
        orgName: data.organization?.name || '',
        regCountry: data.regulated_country,
        regState: data.regulated_state,
        regRegion: data.regulated_region,
        license_number: data.license_number,
        license_expiry: data.license_expiry,
        address: data.address,
        regWasteTypes: data.regulated_waste_types || [],
        regGoodsTypes: data.regulated_goods_types || [],
        regLogScope: data.regulated_logistics_scope || [],
      };

      setSelectedReg(mappedReg);
      setViewOpen(true);
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to load regulator details.');
    }
  };

  // Edit regulator jurisdiction
  const editRegulatorJurisdiction = async (
    regId: string,
    data: { country: string; state: string; region: string },
    regulator: Regulators
  ) => {
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

      const payload = {
        organization_name: regulator.orgName || '',
        name: regulator.name || '',
        email: regulator.email || '',
        license_number: regulator.license_number || '',
        license_expiry:
          regulator.license_expiry || new Date().toISOString().slice(0, 10),
        phone_number: regulator.phone || '',
        address: regulator.address || '',
        regulated_waste_types: regulator.regWasteTypes || [],
        regulated_goods_types: regulator.regGoodsTypes || [],
        regulated_logistics_scope: regulator.regLogScope || [],

        // updated fields
        regulated_country: data.country,
        regulated_state: data.state,
        regulated_region: data.region,
      };

      await axios.patch(
        `https://medilogic-backend.onrender.com/super/super/regulator/${regId}/jurisdiction`,
        payload,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      setRegs((prev) =>
        prev.map((r) =>
          r.id === regId
            ? {
                ...r,
                regCountry: data.country,
                regState: data.state,
                regRegion: data.region,
              }
            : r
        )
      );

      toast.success('Regulator jurisdiction updated successfully');
    } catch (err: any) {
      console.error('Failed to edit regulator jurisdiction:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to edit jurisdiction';
      toast.error(msg);
    }
  };

  // activate regulator
  const activateReg = async (regId: string) => {
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
        `https://medilogic-backend.onrender.com/super/super/regulators/${regId}/activate`,
        {},
        {
          headers: { Authorization: `Bearer ${validToken}` },
        }
      );

      setRegs((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: 'active' } : r))
      );

      toast.success('Regulator activated successfully');
    } catch (err: any) {
      console.error('Failed to activate organization:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to activate organization';
      toast.error(msg);
    }
  };

  // deactivate regulator
  const deactivateReg = async (regId: string) => {
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

      await axios.put(
        `https://medilogic-backend.onrender.com/super/super/regulators/${regId}/deactivate`,
        {},
        {
          headers: { Authorization: `Bearer ${validToken}` },
        }
      );

      // update local state after successful deletion
      setRegs((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: 'inactive' } : r))
      );

      toast.success('Regulator deactivated successfully');
    } catch (err: any) {
      console.error('Failed to deactivate organization:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to deactivate organization';
      toast.error(msg);
    }
  };

  // delete regulator
  const deleteReg = async (regId: string) => {
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
        `https://medilogic-backend.onrender.com/super/super/regulators/${regId}`,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      // ✅ Just remove locally, don’t refetch whole list
      setRegs((prev) => prev.filter((r) => r.id !== regId));

      toast.success('Regulator permanently deleted 🗑️');
    } catch (err: any) {
      console.error('Failed to delete org:', err);
      const msg =
        err?.response?.data?.detail ||
        err.message ||
        'Failed to delete organization';
      toast.error(msg);
    }
  };

  return {
    regs,
    loading,
    filteredRegs,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    editOpen,
    setEditOpen,
    selectedReg,
    setSelectedReg,
    createReg,
    viewOpen,
    setViewOpen,
    viewReg,
    editRegulatorJurisdiction,
    activateReg,
    deactivateReg,
    deleteReg,
  };
}
