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
import { UserPlus, XIcon, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useOrganizations } from '@/hooks/useOrg';
import axios from 'axios';
import { useAuthorizedRequest } from '../../../../../../../hooks/useRequest';

export const CreateAdmin = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [organizationId, setOrganizationId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { orgs, loading } = useOrganizations();
  const [showPassword, setShowPassword] = useState(false);

  const authorizedRequest = useAuthorizedRequest();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setOrganizationId('');
    setStatus('active');
  };

  const handleCreate = async () => {
    if (!name || !email || !password || !organizationId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    await authorizedRequest(async (validToken: string) => {
      try {
        const payload = {
          email: email.trim(),
          password: password.trim(),
          role: 'admin', // ✅ ensure admin role is sent
          name: name.trim(),
          organization_id: organizationId,
        };

        console.log('Payload being sent:', payload);

        const res = await axios.post(
          'https://medilogic-backend.onrender.com/super/super/admins',
          payload,
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response from backend:', res.data);
        toast.success('User created successfully!');
        setOpen(false);
        resetForm();
      } catch (error: any) {
        // Case 1: backend actually responded with error
        if (error.response) {
          console.error('Backend error:', error.response.data);
          toast.error(error.response.data?.message || 'Failed to create user');
        }
        // Case 2: Axios "Network Error" but request may have succeeded
        else if (error.message?.includes('Network Error')) {
          console.warn(
            'Network Error but user may have been created successfully.'
          );
          toast.success('User created successfully');
          setOpen(false);
          resetForm();
        }
        // Case 3: Unexpected error
        else {
          console.error('Unexpected error:', error);
          toast.error('Something went wrong');
        }
      }
    }, 'Failed to create user').finally(() => setSubmitting(false));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="primary-button cursor-pointer">
          <UserPlus className="h-5 w-5" />
          Create User
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle>Create new user</AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent">
              <XIcon />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-gray-400">
            Add a new user to an organization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter a secure password"
                className="w-full bg-gray-700 border-gray-600 text-white pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as 'active' | 'inactive')}
            >
              <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Organization */}
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
        </div>

        <AlertDialogFooter>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="primary-button flex-1"
              disabled={submitting}
              onClick={handleCreate}
            >
              {submitting ? 'Creating...' : 'Create User'}
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
