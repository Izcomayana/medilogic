'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, Search, Building2 } from 'lucide-react';
import { AdminTable } from './components/AdminTable';
import { useOrganizations } from '@/hooks/useOrg';
import React from 'react';
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
import { AdminActionsDialog } from './components/AdminActions';
import { PageHeader } from '../../../PageHeader';
import { useAdmin } from '@/hooks/useAdmin';

//
// ✅ Strongly typed NewAdmin type
//
type NewAdmin = {
  name: string;
  email: string;
  role: 'admin' | 'super-admin' | 'user';
  organizationId?: string;
};

//
// ✅ CreateAdmin Component with proper props
//
interface CreateAdminProps {
  onCreate: (adminData: NewAdmin) => Promise<void>;
}

export function CreateAdmin({ onCreate }: CreateAdminProps) {
  return (
    <button
      onClick={() =>
        onCreate({
          name: 'Test Admin',
          email: 'test@example.com',
          role: 'admin',
        })
      }
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Create Admin
    </button>
  );
}

//
// ✅ OrgAdmin Page
//
export default function OrgAdmin() {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState<string>(''); // org filter
  const { orgs } = useOrganizations();

  const {
    createAdmin,
    filteredAdmins,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    loading,
    loadingAction,
    editOpen,
    setEditOpen,
    activateAdmin,
    deactivateAdmin,
    deleteAdmin,
    editAdmin,
    setEditAdmin,
  } = useAdmin();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Admins"
        subtitle="View and manage admins across all organizations"
      />

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Organization Admins ({filteredAdmins.length})
              </CardTitle>
              <CreateAdmin onCreate={createAdmin} />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Organization Filter */}
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600 text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue
                    placeholder={
                      loading
                        ? 'Loading organizations...'
                        : 'Select organization'
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {orgs.map((org) => (
                    <SelectItem key={org.id} value={org.name}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Admin Table */}
            <AdminTable
              admins={filteredAdmins}
              loading={loading}
              onEdit={(admin) => {
                setEditAdmin(admin);
                setEditOpen(true);
              }}
              // If delete is enabled:
              // onDelete={(adminId) => {
              //   setEditAdmin(filteredAdmins.find((a) => a.id === adminId) || null);
              //   setDeleteOpen(true);
              // }}
            />
          </CardContent>
        </Card>
      </main>

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {editAdmin?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              admin and remove all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
              onClick={() => {
                if (editAdmin) deleteAdmin(editAdmin.id);
                setDeleteOpen(false);
                setEditAdmin(null);
              }}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit / Activate / Deactivate */}
      {editOpen && (
        <AdminActionsDialog
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setEditAdmin(null);
          }}
          admin={editAdmin}
          onDeactivate={deactivateAdmin}
          onActivate={activateAdmin}
          loadingAction={loadingAction}
        />
      )}
    </div>
  );
}
