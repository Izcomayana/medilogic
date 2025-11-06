'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search } from 'lucide-react';
import OrganizationTable from './components/OrgTable';
import { useOrganizations } from '@/hooks/orgs/useOrg';
import {
  OrgActionsDialog,
  ViewOrganizationDialog,
} from './components/OrgDialogs';
import React from 'react';
import CreateOrganizationDialog from './components/creatOrg';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { PageHeader } from '../../../components/PageHeader';

export default function OrganizationsPage() {
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const {
    filteredOrgs,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createOrg,
    viewOrg,
    editOrg,
    activateOrg,
    deactivateOrg,
    regenerateInviteCode,
    viewOpen,
    editOpen,
    selectedOrg,
    closeView,
    closeEdit,
    deleteOrg,
    setSelectedOrg,
  } = useOrganizations();

  const MemoizedOrgTable = React.memo(OrganizationTable);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Organizations"
        subtitle="Manage all organizations and their settings"
      />

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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MemoizedOrgTable
              organizations={filteredOrgs}
              onView={viewOrg}
              onEdit={editOrg}
              onDelete={(orgId) => {
                setSelectedOrg(
                  filteredOrgs.find((o) => o.id === orgId) || null
                );
                setDeleteOpen(true);
              }}
              loading={loading}
            />

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {selectedOrg?.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the organization and remove all related data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      if (selectedOrg) deleteOrg(selectedOrg.id);
                      setDeleteOpen(false);
                      setSelectedOrg(null);
                    }}
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {viewOpen && selectedOrg && (
              <ViewOrganizationDialog
                open={viewOpen}
                onClose={closeView}
                org={selectedOrg}
              />
            )}

            {editOpen && (
              <OrgActionsDialog
                open={editOpen}
                onClose={closeEdit}
                org={selectedOrg}
                onRegenerate={regenerateInviteCode}
                onDeactivate={deactivateOrg}
                onActivate={activateOrg}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
