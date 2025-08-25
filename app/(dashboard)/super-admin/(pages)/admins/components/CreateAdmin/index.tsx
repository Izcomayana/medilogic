/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useOrganizations } from '@/hooks/useOrg';

interface Props {
  onCreate: (adminData: {
    name: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    role: 'admin';
    organization_id: string;
  }) => void | Promise<void>;
}

export const CreateAdmin = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [role, setRole] = useState<'admin'>('admin');
  const [organizationId, setOrganizationId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { orgs, loading } = useOrganizations();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setOrganizationId('');
    setStatus('active');
    setRole('admin');
  };

  const handleCreate = async () => {
    if (!name || !email || !password || !organizationId) {
      toast.error('Please fill in all required fields');
      return;
    }

    // guard: only the two enum values
    if (!['active', 'inactive'].includes(status)) {
      toast.error("Type must be 'active' or 'inactive'");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        status,
        role,
        organization_id: organizationId,
      });
      // close only on success
      setOpen(false);
      resetForm();
      // onCreate should toast its own error; keep dialog open
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="primary-button cursor-pointer">
          <UserPlus className="h-5 w-5" />
          Create Admin
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle>Create new admin</AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent">
              <XIcon />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-gray-400">
            Add a new admin to an organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@regulator.gov"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter a secure password"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as 'active' | 'inactive')}
            >
              <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organization" className="text-gray-300">
              Organization
            </Label>
            <Select
              value={organizationId}
              onValueChange={(v) => setOrganizationId(v)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue
                  placeholder={
                    loading ? 'Loading organizations...' : 'Select organization'
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-500 border-gray-600">
                {orgs.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-gray-300">
              Role
            </Label>
            <Select value={role} onValueChange={(v) => setRole(v as 'admin')}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="primary-button flex-1"
              disabled={submitting}
              onClick={handleCreate}
            >
              {submitting ? 'Creating...' : 'Create Admin'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              onClick={resetForm}
            >
              Reset Form
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
