'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Power, PowerOff } from 'lucide-react';
import type { Admin } from '../../type/admin';
import React from 'react';

interface ActionsDialogProps {
  open: boolean;
  onClose: () => void;
  admin: Admin | null;
  onDeactivate: (id: string) => void;
  onActivate: (id: string) => void;
  loadingAction: boolean;
}

export function AdminActionsDialog({
  open,
  onClose,
  admin,
  onDeactivate,
  onActivate,
  loadingAction,
}: ActionsDialogProps) {
  if (!admin) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Edits {admin.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Perform quick actions for this organization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 py-4">
          {admin.status === 'active' ? (
            <Button
              variant="destructive"
              disabled={loadingAction}
              onClick={() => onDeactivate(admin.id)}
              className="flex items-center gap-2"
            >
              <PowerOff className="h-4 w-4" />
              {loadingAction ? 'Deactivating...' : 'Deactivate'}
            </Button>
          ) : (
            <Button
              disabled={loadingAction}
              onClick={() => onActivate(admin.id)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Power className="h-4 w-4" />
              {loadingAction ? 'Activating...' : 'Activate'}
            </Button>
          )}
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-800 hover:bg-gray-700"
          >
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
