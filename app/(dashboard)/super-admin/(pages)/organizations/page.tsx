/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Organization } from "./org";
import CreateOrganizationDialog from "./components/creatOrg";
import OrganizationTable from "./components/OrgTable";
import { useAuth } from "@/components/auth";
import { isTokenExpired } from "@/hooks/token";
import axios from "axios";
import React from "react";
import {
  EditOrganizationDialog,
  ViewOrganizationDialog,
} from "./components/OrgDialogs";

const getStatusBadge = (status?: string) => {
  if (!status) {
    return (
      <span className="border px-2 py-1 rounded text-xs text-gray-400">
        Unknown
      </span>
    );
  }

  switch (status.toLowerCase()) {
    case "active":
      return (
        <span className="bg-[#15941f] text-white px-2 py-1 rounded text-xs">
          Active
        </span>
      );
    case "pending":
      return (
        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
          Pending
        </span>
      );
    case "inactive":
      return (
        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
          Inactive
        </span>
      );
    default:
      return <span className="border px-2 py-1 rounded text-xs">{status}</span>;
  }
};

export default function Organizations() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Organization>(
    {} as Organization,
  );

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
          "https://medilogic-backend.onrender.com/super/organizations",
          { headers: { Authorization: `Bearer ${validToken}` } },
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
          status: o.is_active ? false : true,
          userCount: o.user_count ?? 0,
          createdDate: new Date(o.created_at).toLocaleDateString(),
          invite_code: o.invite_code,
          ico_registered: o.ico_registered,
          data_retention_years: o.data_retention_years,
        }));

        setOrgs(mapped);
      } catch (e: any) {
        console.error(
          "Failed to load organizations:",
          e?.response?.data?.detail || e.message,
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrgs();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const filteredOrganizations = useMemo(() => {
    return orgs.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase());

      // const matchesStatus =
      //   statusFilter === "all" ||
      //   org.status.toLowerCase() === statusFilter.toLowerCase();
      // return matchesSearch && matchesStatus;

      return matchesSearch;
    });
  }, [orgs, searchTerm, statusFilter]);

  // view
  const handleViewOrg = async (org: Organization) => {
    const orgId = org.id;
    const existingOrg = orgs.find((o) => o.id === orgId);

    if (existingOrg && existingOrg.description) {
      setSelectedOrg(existingOrg);
      setIsViewDialogOpen(true);
      return;
    }

    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error("Authentication expired. Please log in again.");
          return;
        }
        validToken = refreshed;
      }

      const res = await axios.get(
        `https://medilogic-backend.onrender.com/super/${orgId}`,
        {
          headers: { Authorization: `Bearer ${validToken}` },
        },
      );

      const data = res.data;

      console.log("Raw backend response:", res.data);

      // Adapt API response into your Organization shape
      const mappedOrg: Organization = {
        id: data.organization.id,
        name: data.organization.name,
        type: data.organization.type ?? "", // backend might need to send type
        status: data.organization.is_active ? true : false,
        createdDate: new Date(
          data.organization.created_at,
        ).toLocaleDateString(),
        userCount: data.user_count ?? 0,
        description: data.organization.description ?? "",
        address: data.organization.address ?? "",
        phone: data.organization.phone ?? "",
        email: data.organization.email ?? "",
        invite_code: data.organization.invite_code,
        ico_registered: data.organization.ico_registered,
        data_retention_years: data.organization.data_retention_years,
      };

      setSelectedOrg(mappedOrg);
      setViewOpen(true);
    } catch (err) {
      console.error("Failed to fetch organization details", err);
      toast.error("Failed to load organization details");
    }
  };

  const closeView = () => {
    setViewOpen(false);
    setSelectedOrg(null);
  };

  // edit
  const handleEditOrg = async (org: Organization) => {
    setSelectedOrg(org);
    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return;
        validToken = refreshed;
      }

      const res = await axios.get(
        `https://medilogic-backend.onrender.com/super/${org.id}`,
        { headers: { Authorization: `Bearer ${validToken}` } },
      );

      const data = res.data;
      setEditFormData({
        id: data.organization.id,
        name: data.organization.name,
        type: data.organization.type,
        description: data.organization.description ?? "",
        address: data.organization.address_line ?? "",
        phone: data.organization.phone_number ?? "",
        email: data.organization.email ?? "",
        postal_code: data.organization.postal_code ?? "",
        license_number: data.organization.license_number ?? "",
        waste_processing_capability:
          data.organization.waste_processing_capability ?? "",
        delivery_capacity: data.organization.delivery_capacity ?? 0,
        contact_person_name: data.organization.contact_person_name ?? "",
        contact_person_role: data.organization.contact_person_role ?? "",
        latitude: data.organization.latitude ?? 0,
        longitude: data.organization.longitude ?? 0,
        status: data.organization.is_active,
        createdDate: data.organization.createDate,
        userCount: data.organization.user_count,
      });
      setEditOpen(true);
    } catch (err) {
      toast.error("Failed to load organization details for editing");
    }
  };

  const handleEditChange = (changes: Partial<Organization>) => {
    setEditFormData((prev) => ({ ...prev, ...changes }));
  };

  const handleSaveEdit = async () => {
    if (!selectedOrg || !editFormData) return;

    try {
      let validToken = token;
      if (!validToken || isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast.error("Authentication expired. Please log in again.");
          return;
        }
        validToken = refreshed;
      }

      const payload = {
        id: selectedOrg.id,
        name: editFormData.name,
        type: editFormData.type,
        description: editFormData.description,
        address_line: editFormData.address,
        phone_number: editFormData.phone,
        email: editFormData.email,
        postal_code: editFormData.postal_code ?? "",
        license_number: editFormData.license_number ?? "",
        waste_processing_capability:
          editFormData.waste_processing_capability ?? "",
        delivery_capacity: editFormData.delivery_capacity ?? "",
        contact_person_name: editFormData.contact_person_name ?? "",
        contact_person_role: editFormData.contact_person_role ?? "",
        latitude: editFormData.latitude ?? 0,
        longitude: editFormData.longitude ?? 0,
        is_active: editFormData.status ?? true,
      };

      const res = await axios.patch(
        `https://medilogic-backend.onrender.com/super/${selectedOrg.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(res.data);

      setOrgs((prev) =>
        prev.map((org) =>
          org.id === selectedOrg.id ? { ...org, ...res.data } : org,
        ),
      );

      toast.success(`${payload.name} has been updated successfully`);
      setEditOpen(false);
      setSelectedOrg(null);
    } catch (err: any) {
      const msg = err?.response?.data
        ? JSON.stringify(err.response.data)
        : err.message || "Failed to update organization";
      toast.error(msg);
    }
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedOrg(null);
  };

  const handleDeactivate = useCallback((orgName: string) => {
    toast.success(`${orgName} has been deactivated`);
  }, []);

  const handleRegenerateCode = useCallback((orgName: string) => {
    toast.success(`Invite code regenerated for ${orgName}`);
  }, []);

  const MemoizedOrgTable = React.memo(OrganizationTable);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Organization Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage all organizations and their settings
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organizations ({filteredOrganizations.length})
              </CardTitle>

              <CreateOrganizationDialog
                onCreate={async (orgData) => {
                  try {
                    let validToken = token;
                    if (!validToken || isTokenExpired(validToken)) {
                      const refreshed = await refreshAccessToken();
                      if (!refreshed) {
                        toast.error(
                          "Authentication expired. Please log in again.",
                        );
                        return;
                      }
                      validToken = refreshed;
                    }

                    const res = await axios.post(
                      "https://medilogic-backend.onrender.com/super/organizations",
                      orgData,
                      {
                        headers: {
                          Authorization: `Bearer ${validToken}`,
                          "Content-Type": "application/json",
                        },
                      },
                    );

                    // optimistic update
                    setOrgs((prev) => [
                      ...prev,
                      {
                        id: res.data.id,
                        name: res.data.name,
                        type: res.data.type,
                        status: res.data.is_active,
                        userCount: res.data.user_count ?? 0,
                        createdDate: new Date(
                          res.data.created_at,
                        ).toLocaleDateString(),
                        invite_code: res.data.invite_code,
                        ico_registered: res.data.ico_registered,
                        data_retention_years: res.data.data_retention_years,
                      },
                    ]);

                    toast.success("Organization created successfully");
                  } catch (err: any) {
                    const detail = err?.response?.data?.detail;
                    const msg = Array.isArray(detail)
                      ? detail.map((d: any) => d.msg).join(" • ")
                      : detail ||
                        err.message ||
                        "Failed to create organization";
                    toast.error(msg);
                    throw err; // so dialog keeps open (since we await it)
                  }
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-600 border-gray-500">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <MemoizedOrgTable
                organizations={filteredOrganizations}
                onRegenerate={handleRegenerateCode}
                onView={handleViewOrg}
                onEdit={handleEditOrg}
                onDeactivate={handleDeactivate}
                viewOpen={isViewDialogOpen}
                editOpen={isEditDialogOpen}
                selectedOrg={selectedOrg}
                editFormData={editFormData}
                onEditChange={handleEditChange}
                onEditSave={handleSaveEdit}
              />
            )}

            {viewOpen && selectedOrg && (
              <ViewOrganizationDialog
                open={viewOpen}
                onClose={closeView}
                org={selectedOrg}
                badgeRenderer={getStatusBadge}
              />
            )}

            {editOpen && (
              <EditOrganizationDialog
                open={editOpen}
                onClose={closeEdit}
                formData={editFormData}
                onChange={handleEditChange}
                onSave={handleSaveEdit}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
