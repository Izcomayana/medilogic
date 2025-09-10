'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Calendar } from 'lucide-react';
import { ActiveUser, DeletedUser } from '../page';
import {
  getRoleBadge,
  getStatusBadge,
  formatDate,
  formatDateTime,
} from './helpers/userUtil';

type UserDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: ActiveUser | DeletedUser | null;
  activeTab: 'active' | 'deleted';
};

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
  activeTab,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View user information</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {user.email}
          </p>
          <p>
            <strong>Role:</strong> {getRoleBadge(user.role)}
          </p>
          {activeTab === 'active' && 'status' in user && (
            <p>
              <strong>Status:</strong> {getStatusBadge(user.status)}
            </p>
          )}
          <p className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {activeTab === 'active' && 'dateJoined' in user
              ? formatDate(user.dateJoined)
              : 'dateDeleted' in user
                ? formatDateTime(user.dateDeleted)
                : 'N/A'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
