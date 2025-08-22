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
import { Building2, Hash, Users } from 'lucide-react';
import type { Regulators } from '../../types/regulator';
import { StatusBadge } from '../StatusBadge';

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  reg: Regulators | null;
}

export function ViewRegulatorDialog({
  open,
  onClose,
  reg,
  // badgeRenderer,
}: ViewDialogProps) {
  if (!reg) return null;
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white !max-w-2xl max-h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Regulator Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            View detailed information about this regulator {reg.name}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            <div>
              <Label className="text-xs uppercase text-gray-400">
                Regulator Name
              </Label>
              <p className="mt-1 text-base font-medium text-white">
                {reg.name}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Status</Label>
              <div className="mt-1">
                <StatusBadge status={reg.status?.toLowerCase()} />
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Role</Label>
              <p className="mt-1 text-base text-gray-200">{reg.role}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Phone</Label>
              <p className="mt-1 text-base text-gray-200">{reg.phone}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Organization Name
              </Label>
              <p className="mt-1 text-base text-gray-200">{reg.orgName}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Regulated Country
              </Label>
              <p className="mt-1 text-base text-gray-200">{reg.regCountry}</p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Regulated Region
              </Label>
              <div className="mt-1">{reg.regRegion}</div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                Regulated State
              </Label>
              <div className="mt-1 flex items-center gap-2 text-base text-gray-200">
                <Users className="h-4 w-4" /> {reg.regState}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                License Number
              </Label>
              <p className="mt-1 text-base text-gray-200">
                {reg.license_number}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">
                License Expiry
              </Label>
              <p className="mt-1 text-base text-gray-200">
                {reg.license_expiry}
              </p>
            </div>

            <div>
              <Label className="text-xs uppercase text-gray-400">Email</Label>
              <p className="mt-1 text-base text-gray-200">{reg.email}</p>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">Address</Label>
              <p className="mt-1 text-base text-gray-200">{reg.address}</p>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                reganization ID
              </Label>
              <div className="mt-1 flex items-center gap-2 text-base text-gray-200">
                <Hash className="h-4 w-4" /> {reg.id}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                Regulated Waste Types
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {reg.regWasteTypes && reg.regWasteTypes.length > 0 ? (
                  reg.regWasteTypes.map((waste, idx) => (
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

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                Regulated Goods Types
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {reg.regGoodsTypes && reg.regGoodsTypes.length > 0 ? (
                  reg.regGoodsTypes.map((goods, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-gray-700 text-gray-200"
                    >
                      {goods}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">None</p>
                )}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Label className="text-xs uppercase text-gray-400">
                Regulated Logisitics Scope
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {reg.regLogScope && reg.regLogScope.length > 0 ? (
                  reg.regLogScope.map((scope, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-gray-700 text-gray-200"
                    >
                      {scope}
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
