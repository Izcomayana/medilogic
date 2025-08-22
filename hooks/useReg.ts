/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
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
        : detail || err.message || 'Failed to create organization';
      toast.error(msg);
      throw err;
    }
  };

  // View Regulator
  const viewReg = async (reg: Regulators) => {
    const regId = reg.id;
    const existingReg = regs.find((r) => r.id === regId);

    if (existingReg && existingReg.name) {
      setSelectedReg(existingReg);
      setViewOpen(true);
      return;
    }

    console.log('view');
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

      console.log('data:', data);
      // const mappedReg: Regulators = {
      //   id: data.regulators.id,
      //   name: data.regulator.name,
      // }
    } catch (error: any) {
      console.log(error);
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
    viewReg,
  };
}
