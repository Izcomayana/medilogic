/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
// import { toast } from 'sonner';
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchRegs();
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
  };
}
