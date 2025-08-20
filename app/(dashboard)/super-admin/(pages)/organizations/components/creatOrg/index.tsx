'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Building2, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

interface Props {
  onCreate: (orgData: {
    name: string;
    type: 'clinic' | 'waste_company';
    country: string;
    state: string;
    region: string;
    ico_registered: boolean;
    data_retention_years: number;
  }) => void | Promise<void>;
}

export default function CreateOrganizationDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  // ✅ default to a valid enum
  const [type, setType] = useState<'clinic' | 'waste_company'>('clinic');
  const [country, setCountry] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [region, setRegion] = useState('');
  const [icoRegistered, setIcoRegistered] = useState(false);
  const [dataRetentionYears, setDataRetentionYears] = useState<number>(3);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name || !type || !country || !stateVal || !region) {
      toast.error('Please fill in all required fields');
      return;
    }

    // guard: only the two enum values
    if (!['clinic', 'waste_company'].includes(type)) {
      toast.error("Type must be 'clinic' or 'waste_company'");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({
        name: name.trim(),
        type,
        country: country.trim(),
        state: stateVal.trim(),
        region: region.trim(),
        ico_registered: icoRegistered,
        data_retention_years: Number(dataRetentionYears) || 1,
      });
      // close only on success
      setOpen(false);
      // reset
      setName('');
      setType('clinic');
      setCountry('');
      setStateVal('');
      setRegion('');
      setIcoRegistered(false);
      setDataRetentionYears(3);
    } catch {
      // onCreate should toast its own error; keep dialog open
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="primary-button cursor-pointer">
          <Building2 className="h-4 w-4" />
          Create Organization
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle>Create New Organization</AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent">
              <XIcon />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-gray-400">
            Add a new organization to the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization name"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Type — ONLY allowed enum values */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as 'clinic' | 'waste_company')}
            >
              <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="waste_company">Waste Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* State */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              value={stateVal}
              onChange={(e) => setStateVal(e.target.value)}
              placeholder="State"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Region */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Region
            </Label>
            <Input
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* ICO Registered */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ico" className="text-right">
              ICO Registered
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Switch
                id="ico"
                checked={icoRegistered}
                onCheckedChange={setIcoRegistered}
              />
              <span className="text-gray-300 text-sm">
                {icoRegistered ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Data Retention Years */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataRetention" className="text-right">
              Data Retention (Years)
            </Label>
            <Input
              id="dataRetention"
              type="number"
              min={1}
              value={dataRetentionYears}
              onChange={(e) =>
                setDataRetentionYears(Math.max(1, Number(e.target.value)))
              }
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            type="button"
            className="primary-button"
            onClick={handleCreate}
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Organization'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
