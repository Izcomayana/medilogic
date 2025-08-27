'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Shield } from 'lucide-react';
import { RegulatorTable } from './components/RegulatorTable';
import { CreateRegulatorDialog } from './components/CreateRegulator';
import { EditRegulatorDialog } from './components/EditRegulator';
import { useRegulators } from '@/hooks/useReg';
import { ViewRegulatorDialog } from './components/ViewReg';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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
import { PageHeader } from '../../PageHeader';

export default function RegulatorsPage() {
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const {
    filteredRegs,
    createReg,
    searchTerm,
    statusFilter,
    setStatusFilter,
    setSearchTerm,
    setSelectedReg,
    setEditOpen,
    selectedReg,
    editOpen,
    loading,
    viewReg,
    viewOpen,
    setViewOpen,
    activateReg,
    deactivateReg,
    deleteReg,
  } = useRegulators();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Regulators"
        subtitle="Manage regulatory oversight personnel"
      />

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" /> Regulators ({filteredRegs.length}
                )
              </CardTitle>
              <CreateRegulatorDialog onCreate={createReg} />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search regulators by name, region or country..."
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

            <RegulatorTable
              regulators={filteredRegs}
              onEdit={(reg) => {
                setSelectedReg(reg);
                setEditOpen(true);
              }}
              onView={viewReg}
              loading={loading}
              onDelete={(regId) => {
                setSelectedReg(
                  filteredRegs.find((r) => r.id === regId) || null
                );
                setDeleteOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedReg?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              regulator and remove all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (selectedReg) deleteReg(selectedReg.id);
                setDeleteOpen(false);
                setSelectedReg(null);
              }}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {viewOpen && selectedReg && (
        <ViewRegulatorDialog
          open={viewOpen}
          onClose={() => {
            setViewOpen(false);
            setSelectedReg(null);
          }}
          reg={selectedReg}
        />
      )}

      {editOpen && (
        <EditRegulatorDialog
          regulator={selectedReg}
          open={editOpen}
          setOpen={setEditOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedReg(null);
          }}
          onDeactivate={deactivateReg}
          onActivate={activateReg}
        />
      )}
    </div>
  );
}
