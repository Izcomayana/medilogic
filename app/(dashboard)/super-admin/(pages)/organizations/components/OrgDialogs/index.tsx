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
import { Label } from '@/components/ui/label';
import {
  Building2,
  Hash,
  Power,
  PowerOff,
  RefreshCcw,
  Users,
} from 'lucide-react';
import type { Organization } from '../../../../../../../hooks/orgs/org';
import { StatusBadge } from '../StatusBadge';

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
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white !max-w-2xl max-h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Organization Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            View detailed information about this organization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            <div>
              <Label className="text-xs uppercase text-gray-400">
                Organization Name
              </Label>
              <p className="mt-1 text-base font-medium text-white">
                {org.name}
              </p>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                Organization ID
              </Label>
              <div className="mt-1 flex items-center gap-2 text-base text-gray-200">
                <Hash className="h-4 w-4" /> {org.id}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Status</Label>
              <div className="mt-1">
                <StatusBadge status={org.status?.toLowerCase()} />
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Invite Code
              </Label>
              <p className="mt-1 text-base text-gray-200">{org.invite_code}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Email</Label>
              <p className="mt-1 text-base text-gray-200">{org.email}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Phone</Label>
              <p className="mt-1 text-base text-gray-200">{org.phone}</p>
            </div>
            <div>
              <Label className="text-xs uppercase text-gray-400">Country</Label>
              <p className="mt-1 text-base text-gray-200">{org.country}</p>
            </div>
            <div>
              <Label className="text-xs uppercase text-gray-400">Region</Label>
              <p className="mt-1 text-base text-gray-200">{org.region}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">State</Label>
              <p className="mt-1 text-base text-gray-200">{org.state}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Postal Code
              </Label>
              <p className="mt-1 text-base text-gray-200">{org.postal_code}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Data Retention Years
              </Label>
              <p className="mt-1 text-base text-gray-200">
                {org.data_retention_years}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                ICO Registered
              </Label>
              <div className="mt-1">
                <StatusBadge status={org.ico_registered} />
              </div>
            </div>

            {org.ico_registered && (
              <div>
                <Label className="text-xs uppercase text-gray-400">
                  ICO Registered Number
                </Label>
                <p className="mt-1 text-base text-gray-200">
                  {org.ico_registration_number}
                </p>
              </div>
            )}

            <div>
              <Label className="text-xs uppercase text-gray-400">
                License Expiry
              </Label>
              <p className="mt-1 text-base text-gray-200">
                {org.license_expiry}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                License Number
              </Label>
              <p className="mt-1 text-base text-gray-200">
                {org.license_number}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                User Count
              </Label>
              <div className="mt-1 flex items-center gap-2 text-base text-gray-200">
                <Users className="h-4 w-4" /> {org.userCount}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Trip Count
              </Label>
              <div className="mt-1 flex items-center gap-2 text-base text-gray-200">
                <Users className="h-4 w-4" /> {org.tripCount}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">Address</Label>
              <p className="mt-1 text-base text-gray-200">{org.address}</p>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                Supported Waste Types
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {org.supported_waste_type &&
                org.supported_waste_type.length > 0 ? (
                  org.supported_waste_type.map((waste, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-gray-700 text-gray-200"
                    >
                      {waste}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">None</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-700 hover:text-gray-200 hover:bg-gray-700"
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

          {org.status === 'active' ? (
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
