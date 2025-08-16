"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2, Search } from "lucide-react";
import OrganizationTable from "./components/OrgTable";
import { useOrganizations } from "@/hooks/useOrg";
import {
  EditOrganizationDialog,
  ViewOrganizationDialog,
} from "./components/OrgDialogs";
import React from "react";
import CreateOrganizationDialog from "./components/creatOrg";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function OrganizationsPage() {
  const {
    orgs,
    filteredOrgs,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createOrg,
    viewOrg,
    editOrg,
    deactivateOrg,
    regenerateInviteCode,
    viewOpen,
    editOpen,
    selectedOrg,
    editFormData,
    handleEditChange,
    handleSaveEdit,
    closeView,
    closeEdit,
  } = useOrganizations();

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
                <Building2 className="h-5 w-5" /> Organizations (
                {filteredOrgs.length})
              </CardTitle>
              <CreateOrganizationDialog onCreate={createOrg} />
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
                organizations={filteredOrgs}
                onRegenerate={regenerateInviteCode}
                onView={viewOrg}
                onEdit={editOrg}
                onDeactivate={deactivateOrg}
                onEditSave={handleSaveEdit}
                viewOpen={false}
                selectedOrg={selectedOrg}
                editFormData={editFormData}
                onEditChange={handleEditChange}
              />
            )}

            {viewOpen && selectedOrg && (
              <ViewOrganizationDialog
                open={viewOpen}
                onClose={closeView}
                org={selectedOrg}
                // badgeRenderer={getStatusBadge}
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
