"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Calendar,
  Hash,
  Power,
  PowerOff,
  RefreshCcw,
  Users,
} from "lucide-react";
import type { Organization } from "../../org";
import { StatusBadge } from "../StatusBadge";

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  org: Organization | null;
}

export function ViewOrganizationDialog({
  open,
  onClose,
  org,
  // badgeRenderer,
}: ViewDialogProps) {
  if (!org) return null;
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Organization Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            View detailed information about this organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
              <div>
                <StatusBadge status={org.status?.toLowerCase()} />
              </div>
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

interface ActionsDialogProps {
  open: boolean;
  onClose: () => void;
  org: Organization | null;
  onRegenerate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onActivate: (id: string) => void;
}

export function OrgActionsDialog({
  open,
  onClose,
  org,
  onRegenerate,
  onDeactivate,
  onActivate,
}: ActionsDialogProps) {
  if (!org) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Edits {org.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Perform quick actions for this organization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Button
            variant="outline"
            onClick={() => onRegenerate(org.id)}
            className="flex items-center gap-2 border-gray-600 text-white bg-gray-700 hover:text-gray-700 hover:bg-gray-100"
          >
            <RefreshCcw className="h-4 w-4" />
            Regenerate Invite Code
          </Button>

          {org.status === "active" ? (
            <Button
              variant="destructive"
              onClick={() => onDeactivate(org.id)}
              className="flex items-center gap-2"
            >
              <PowerOff className="h-4 w-4" />
              Deactivate
            </Button>
          ) : (
            <Button
              onClick={() => onActivate(org.id)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Power className="h-4 w-4" />
              Activate
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
