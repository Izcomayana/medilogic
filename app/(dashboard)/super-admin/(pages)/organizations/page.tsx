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

export default function Organizations() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, refreshAccessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [editFormData, setEditFormData] = useState<Organization>({
    id: "",
    name: "",
    type: "",
    status: "",
    createdDate: "",
    userCount: 0,
    description: "",
    address: "",
    phone: "",
    email: "",
  });

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
          status: o.is_active ? "Active" : "Inactive",
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
      const matchesStatus =
        statusFilter === "all" ||
        org.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orgs, searchTerm, statusFilter]);

  const handleDeactivate = useCallback((orgName: string) => {
    toast.success(`${orgName} has been deactivated`);
  }, []);

  const handleRegenerateCode = useCallback((orgName: string) => {
    toast.success(`Invite code regenerated for ${orgName}`);
  }, []);

  const handleViewOrg = async (orgId: string) => {
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

      // Adapt API response into your Organization shape
      const mappedOrg: Organization = {
        id: data.organization.id,
        name: data.organization.name,
        type: data.organization.type ?? "", // backend might need to send type
        status: data.organization.is_active ? "Active" : "Inactive",
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
      setIsViewDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch organization details", err);
      toast.error("Failed to load organization details");
    }
  };

  const handleEditOrg = useCallback((org: Organization) => {
    setSelectedOrg(org);
    setEditFormData(org);
    setIsEditDialogOpen(true);
  }, []);

  const handleEditChange = (changes: Partial<Organization>) => {
    setEditFormData((prev) => ({ ...prev, ...changes }));
  };

  const handleSaveEdit = () => {
    if (!selectedOrg || !editFormData) return;
    toast.success(`${editFormData.name} has been updated successfully`);
    setIsEditDialogOpen(false);
    setSelectedOrg(null);
  };

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
                        status: res.data.is_active ? "Active" : "Inactive",
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
                onView={(org) => handleViewOrg(org.id)}
                onEdit={handleEditOrg}
                onDeactivate={handleDeactivate}
                viewOpen={isViewDialogOpen}
                editOpen={isEditDialogOpen}
                selectedOrg={selectedOrg}
                editFormData={editFormData}
                closeView={() => setIsViewDialogOpen(false)}
                closeEdit={() => setIsEditDialogOpen(false)}
                onEditChange={handleEditChange}
                onEditSave={handleSaveEdit}
              />

              // <OrganizationTable
              //   organizations={filteredOrganizations}
              //   onRegenerate={handleRegenerateCode}
              //   onView={(org) => handleViewOrg(org.id)}
              //   onEdit={handleEditOrg}
              //   onDeactivate={handleDeactivate}
              //   viewOpen={isViewDialogOpen}
              //   editOpen={isEditDialogOpen}
              //   selectedOrg={selectedOrg}
              //   editFormData={editFormData}
              //   closeView={() => setIsViewDialogOpen(false)}
              //   closeEdit={() => setIsEditDialogOpen(false)}
              //   onEditChange={handleEditChange}
              //   onEditSave={handleSaveEdit}
              // />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
