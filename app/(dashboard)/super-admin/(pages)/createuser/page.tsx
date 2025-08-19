'use client';

import type React from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('User created successfully');
    setFormData({ name: '', email: '', role: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Create User</h1>
          <p className="text-sm text-gray-400">
            Create a new super admin or high-level admin user
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create New User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role" className="text-gray-300">
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white mb-2">
                    Role Permissions
                  </h3>
                  <div className="text-sm text-gray-400">
                    {formData.role === 'super-admin' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Full system access</li>
                        <li>Manage all organizations and users</li>
                        <li>Create and manage regulators</li>
                        <li>System configuration access</li>
                      </ul>
                    )}
                    {formData.role === 'admin' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Manage organizations and users</li>
                        <li>View regulator information</li>
                        <li>Limited system configuration</li>
                      </ul>
                    )}
                    {formData.role === 'manager' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>View organizations and users</li>
                        <li>Basic reporting access</li>
                        <li>No system configuration</li>
                      </ul>
                    )}
                    {!formData.role && <p>Select a role to see permissions</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="primary-button flex-1">
                    Create User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() =>
                      setFormData({ name: '', email: '', role: '' })
                    }
                  >
                    Reset Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
