//* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Organization } from './org';
import { useAuthorizedRequest } from '../useRequest';
import { useAuth } from '@/components/auth';

export function useOrganizations() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [editFormData, setEditFormData] = useState<Organization>(
    {} as Organization
  );

  const request = useAuthorizedRequest();
  const { role } = useAuth();

  // Fetch organizations
  useEffect(() => {
    if (role !== 'super_admin') return;
    let isMounted = true;
    setLoading(true);

    request(async (validToken) => {
      const res = await axios.get(
        'https://medilogic-backend.onrender.com/super/organizations',
        { headers: { Authorization: `Bearer ${validToken}` } }
      );

      type ApiOrg = {
        id: string;
        name: string;
        invite_code: string;
        ico_registered: boolean;
        ico_registration_number: string;
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
        ico_registration_number: o.ico_registration_number,
        data_retention_years: o.data_retention_years,
      }));

      mapped.sort((a, b) => a.name.localeCompare(b.name));

      if (isMounted) {
        setOrgs(mapped);
      }
    }, 'Failed to load organizations').finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [request]);

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
    const res = await request(
      (validToken) =>
        axios.post(
          'https://medilogic-backend.onrender.com/super/organizations',
          orgData,
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
              'Content-Type': 'application/json',
            },
          }
        ),
      'Failed to create organization'
    );

    if (!res) return;

    const o = res.data;
    setOrgs((prev) => [
      ...prev,
      {
        id: o.id,
        name: o.name,
        type: o.type,
        status: o.is_active ? 'active' : 'inactive',
        userCount: o.user_count ?? 0,
        createdDate: new Date(o.created_at).toLocaleDateString(),
        invite_code: o.invite_code,
        ico_registered: o.ico_registered,
        icoNumber: o.ico_registration_number,
        data_retention_years: o.data_retention_years,
      },
    ]);
    toast.success('Organization created successfully');
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

    const res = await request(
      (validToken) =>
        axios.get(`https://medilogic-backend.onrender.com/super/${orgId}`, {
          headers: { Authorization: `Bearer ${validToken}` },
        }),
      'Failed to load organization details'
    );

    if (!res) return;

    const data = res.data;
    const mappedOrg: Organization = {
      id: data.organization.id,
      name: data.organization.name,
      type: data.organization.type ?? data.organization.org_type ?? 'Unknown',
      status: data.organization.is_active ? 'active' : 'inactive',
      createdDate: new Date(data.organization.created_at).toLocaleDateString(),
      userCount: data.user_count ?? 0,
      tripCount: data.trip_count ?? 0,
      description: data.organization.description ?? '',
      address: data.organization.address_line ?? '',
      country: data.organization.country ?? '',
      region: data.organization.region ?? '',
      state: data.organization.state ?? '',
      phone: data.organization.phone_number ?? '',
      email: data.organization.email ?? '',
      postal_code: data.organization.postal_code ?? '',
      invite_code: data.organization.invite_code,
      ico_registered: data.organization.ico_registered,
      ico_registration_number:
        data.organization.ico_registration_number ??
        // existingOrg?.ico_registration_number ??
        '',
      license_number: data.organization.license_number,
      license_expiry: data.organization.license_expiry,
      data_retention_years: data.organization.data_retention_years,
      supported_waste_type: data.organization.supported_waste_types ?? [],
    };

    setSelectedOrg(mappedOrg);
    setViewOpen(true);
  };

  //   // Edit org
  const editOrg = async (org: Organization) => {
    setSelectedOrg(org);
    setEditOpen(true);
  };

  // Misc actions
  const activateOrg = async (orgId: string) => {
    const res = await request(
      (validToken) =>
        axios.patch(
          `https://medilogic-backend.onrender.com/super/${orgId}/activate`,
          {},
          { headers: { Authorization: `Bearer ${validToken}` } }
        ),
      'Failed to activate organization'
    );

    if (!res) return;
    setOrgs((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, status: 'active' } : o))
    );
    closeEdit();
    toast.success('Organization activated successfully');
  };

  const deactivateOrg = async (orgId: string) => {
    const res = await request(
      (validToken) =>
        axios.delete(`https://medilogic-backend.onrender.com/super/${orgId}`, {
          headers: { Authorization: `Bearer ${validToken}` },
        }),
      'Failed to deactivate organization'
    );

    if (!res) return;
    setOrgs((prev) => prev.filter((o) => o.id !== orgId));
    closeEdit();
    toast.success('Organization deactivated successfully');
  };

  const regenerateInviteCode = async (orgId: string) => {
    const res = await request(
      (validToken) =>
        axios.post(
          `https://medilogic-backend.onrender.com/super/${orgId}/regenerate-code`,
          {},
          { headers: { Authorization: `Bearer ${validToken}` } }
        ),
      'Failed to regenerate invite code'
    );

    if (!res) return;

    const newCode = res.data?.new_invite_code;
    setOrgs((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, invite_code: newCode } : o))
    );
    closeEdit();
    toast.success(
      `Invite code regenerated successfully 🎉\nNew code: ${newCode}`
    );
  };

  const deleteOrg = async (orgId: string) => {
    const res = await request(
      (validToken) =>
        axios.delete(
          `https://medilogic-backend.onrender.com/super/organizations/${orgId}/permanent`,
          { headers: { Authorization: `Bearer ${validToken}` } }
        ),
      'Failed to delete organization'
    );

    if (!res) return;
    setOrgs((prev) => prev.filter((o) => o.id !== orgId));
    toast.success('Organization permanently deleted 🗑️');
  };

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
