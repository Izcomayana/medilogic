'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = { open: boolean; onClose: () => void };

export default function DeleteAccountModal({ open, onClose }: Props) {
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No token found. Please log in again.');

      const res = await fetch(
        'https://medilogic-backend.onrender.com/users/users/users/me',
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to delete account');
      }

      toast.success('Account deleted successfully. You will be logged out.');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
