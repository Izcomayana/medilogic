// /organizations/hooks/useOrganizations.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Organization } from '../app/(dashboard)/super-admin/(pages)/organizations/org';
import { useAuth } from '@/components/auth';
import { isTokenExpired } from '@/hooks/token';

export function useOrganizations() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [editFormData, setEditFormData] = useState<Organization>(
    {} as Organization
  );

  // Fetch organizations
  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchOrgs = async () => {
      setLoading(true);
      let validToken = token;

      if (isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return;
        validToken = refreshed;
      }

      try {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/super/organizations',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        if (!isMounted) return;

        type ApiOrg = {
          id: string;
          name: string;
          invite_code: string;
          ico_registered: boolean;
          data_retention_years: number;
          type: string;
          is_active: boolean;
          created_at: string;
          user_count: number;
        };

        const mapped: Organization[] = (res.data as ApiOrg[]).map((o) => ({
          id: o.id,
          name: o.name,
          type: o.type,
          status: o.is_active ? 'active' : 'inactive',
          userCount: o.user_count ?? 0,
          createdDate: new Date(o.created_at).toLocaleDateString(),
          invite_code: o.invite_code,
          ico_registered: o.ico_registered,
          data_retention_years: o.data_retention_years,
        }));

        setOrgs(mapped);
      } catch (e: any) {
        console.error(
          'Failed to load organizations:',
          e?.response?.data?.detail || e.message
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrgs();
    return () => {
      isMounted = false;
    };
  }, [token, refreshAccessToken]);

  // Filtered orgs
  const filteredOrgs = useMemo(() => {
    return orgs.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === 'all') return matchesSearch;
      return (
        matchesSearch &&
        org.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    });
  }, [orgs, searchTerm, statusFilter]);

  // Create org
  const createOrg = async (orgData: any) => {
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
        'https://medilogic-backend.onrender.com/super/organizations',
        orgData,
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setOrgs((prev) => [
        ...prev,
        {
          id: res.data.id,
          name: res.data.name,
          type: res.data.type,
          status: res.data.is_active ? 'active' : 'inactive',
          userCount: res.data.user_count ?? 0,
          createdDate: new Date(res.data.created_at).toLocaleDateString(),
          invite_code: res.data.invite_code,
          ico_registered: res.data.ico_registered,
          data_retention_years: res.data.data_retention_years,
        },
      ]);

      toast.success('Organization created successfully');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d: any) => d.msg).join(' • ')
        : detail || err.message || 'Failed to create organization';
      toast.error(msg);
      throw err;
    }
  };

  // View org
  const viewOrg = async (org: Organization) => {
    const orgId = org.id;
    const existingOrg = orgs.find((o) => o.id === orgId);

    if (existingOrg && existingOrg.description) {
      setSelectedOrg(existingOrg);
      setViewOpen(true);
      return;
    }

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
        `https://medilogic-backend.onrender.com/super/${orgId}`,
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      const data = res.data;
      const mappedOrg: Organization = {
        id: data.organization.id,
        name: data.organization.name,
        type: data.organization.type ?? data.organization.org_type ?? 'Unknown',
        status: data.is_active ? 'active' : 'inactive',
        createdDate: new Date(
          data.organization.created_at
        ).toLocaleDateString(),
        userCount: data.user_count ?? 0,
        tripCount: data.tripCount ?? 0,
        description: data.organization.description ?? '',
        address: data.organization.address_line ?? '',
        phone: data.organization.phone_number ?? '',
        email: data.organization.email ?? '',
        invite_code: data.organization.invite_code,
        ico_registered: data.organization.ico_registered,
        data_retention_years: data.organization.data_retention_years,
        supported_waste_type: data.organization.supported_waste_type ?? [],
      };

      setSelectedOrg(mappedOrg);
      setViewOpen(true);
    } catch {
      toast.error('Failed to load organization details');
    }
  };

  //   // Edit org
  const editOrg = async (org: Organization) => {
    setSelectedOrg(org);
    setEditOpen(true);
    // try {
    //   let validToken = token;
    //   if (!validToken || isTokenExpired(validToken)) {
    //     const refreshed = await refreshAccessToken();
    //     if (!refreshed) return;
    //     validToken = refreshed;
    //   }

    //   const res = await axios.get(
    //     `https://medilogic-backend.onrender.com/super/${org.id}`,
    //     { headers: { Authorization: `Bearer ${validToken}` } }
    //   );

    //   const data = res.data;
    // setEditFormData({
    //   id: data.organization.id,
    //   name: data.organization.name,
    //   type: data.organization.type,
    //   description: data.organization.description ?? '',
    //   address: data.organization.address_line ?? '',
    //   phone: data.organization.phone_number ?? '',
    //   email: data.organization.email ?? '',
    //   postal_code: data.organization.postal_code ?? '',
    //   license_number: data.organization.license_number ?? '',
    //   waste_processing_capability:
    //     data.organization.waste_processing_capability ?? '',
    //   delivery_capacity: data.organization.delivery_capacity ?? 0,
    //   contact_person_name: data.organization.contact_person_name ?? '',
    //   contact_person_role: data.organization.contact_person_role ?? '',
    //   latitude: data.organization.latitude ?? 0,
    //   longitude: data.organization.longitude ?? 0,
    //   status: data.organization.is_active,
    //   createdDate: data.organization.createDate,
    //   userCount: data.organization.user_count,
    // });
    //   setEditOpen(true);
    // } catch {
    //   toast.error('Failed to load organization details for editing');
    // }
  };

  // Misc actions
  const activateOrg = useCallback(
    async (orgId: string) => {
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
          `https://medilogic-backend.onrender.com/super/${orgId}/activate`,
          {},
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        // Update local state (mark org as active)
        setOrgs((prev) =>
          prev.map((o) => (o.id === orgId ? { ...o, status: 'active' } : o))
        );

        closeEdit();
        toast.success('Organization activated successfully');
      } catch (err: any) {
        console.error('Failed to activate organization:', err);
        const msg =
          err?.response?.data?.detail ||
          err.message ||
          'Failed to activate organization';
        toast.error(msg);
      }
    },
    [token, refreshAccessToken]
  );

  const deactivateOrg = useCallback(
    async (orgId: string) => {
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
          `https://medilogic-backend.onrender.com/super/${orgId}`,
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        // update local state after successful deletion
        setOrgs((prev) => prev.filter((o) => o.id !== orgId));
        closeEdit();
        toast.success('Organization deactivated successfully');
      } catch (err: any) {
        console.error('Failed to deactivate organization:', err);
        const msg =
          err?.response?.data?.detail ||
          err.message ||
          'Failed to deactivate organization';
        toast.error(msg);
      }
    },
    [token, refreshAccessToken]
  );

  const regenerateInviteCode = useCallback(
    async (orgId: string) => {
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
          `https://medilogic-backend.onrender.com/super/${orgId}/regenerate-code`,
          {},
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        const newCode = res.data?.new_invite_code;

        // Update the org in local state
        setOrgs((prev) =>
          prev.map((o) => (o.id === orgId ? { ...o, invite_code: newCode } : o))
        );
        closeEdit();
        toast.success(
          `Invite code regenerated successfully 🎉\nNew code: ${newCode}`
        );
      } catch (err: any) {
        console.error('Failed to regenerate invite code:', err);
        const msg =
          err?.response?.data?.detail ||
          err.message ||
          'Failed to regenerate invite code';
        toast.error(msg);
      }
    },
    [token, refreshAccessToken]
  );

  const deleteOrg = useCallback(
    async (orgId: string) => {
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
          `https://medilogic-backend.onrender.com/super/organizations/${orgId}/permanent`,
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        // ✅ Just remove locally, don’t refetch whole list
        setOrgs((prev) => prev.filter((o) => o.id !== orgId));

        toast.success('Organization permanently deleted 🗑️');
      } catch (err: any) {
        console.error('Failed to delete org:', err);
        const msg =
          err?.response?.data?.detail ||
          err.message ||
          'Failed to delete organization';
        toast.error(msg);
      }
    },
    [token, refreshAccessToken]
  );

  // Close dialogs
  const closeView = () => {
    setViewOpen(false);
    setSelectedOrg(null);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedOrg(null);
  };

  return {
    orgs,
    filteredOrgs,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    viewOpen,
    editOpen,
    selectedOrg,
    setSelectedOrg,
    editFormData,
    createOrg,
    viewOrg,
    editOrg,
    activateOrg,
    deactivateOrg,
    deleteOrg,
    regenerateInviteCode,
    closeView,
    closeEdit,
  };
}
