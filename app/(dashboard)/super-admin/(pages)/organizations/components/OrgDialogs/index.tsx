"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Edit, Calendar, Hash, Users } from "lucide-react";
import type { Organization } from "../OrgTable";

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  org: Organization | null;
  badgeRenderer: (status: string) => React.ReactNode;
}

export function ViewOrganizationDialog({
  open,
  onClose,
  org,
  badgeRenderer,
}: ViewDialogProps) {
  if (!org) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Organization Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            View detailed information about this organization.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Organization Name</Label>
              <p>{org.name}</p>
            </div>
            <div>
              <Label>Type</Label>
              <p>{org.type}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Status</Label>
              <div>{badgeRenderer(org.status)}</div>
            </div>
            <div>
              <Label>User Count</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> {org.userCount}
              </div>
            </div>
            <div>
              <Label>Created Date</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {org.createdDate}
              </div>
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <p>{org.description}</p>
          </div>
          <div>
            <Label>Address</Label>
            <p>{org.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <p>{org.phone}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p>{org.email}</p>
            </div>
          </div>
          <div>
            <Label>Organization ID</Label>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4" /> {org.id}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-800 hover:bg-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  formData: Organization;
  onChange: (data: Partial<Organization>) => void;
  onSave: () => void;
}

export function EditOrganizationDialog({
  open,
  onClose,
  formData,
  onChange,
  onSave,
}: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" /> Edit Organization
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the organization information below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Organization Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => onChange({ type: value })}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Financial Services">
                    Financial Services
                  </SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="edit-address">Address</Label>
            <Input
              id="edit-address"
              value={formData.address}
              onChange={(e) => onChange({ address: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-700 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={onSave} className="primary-button">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
