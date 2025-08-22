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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Power, PowerOff } from 'lucide-react';
import { Regulators } from '../../types/regulator';
import { useRegulators } from '@/hooks/useReg';
import { useState, useEffect } from 'react';

interface Props {
  regulator: Regulators | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  onDeactivate: (id: string) => void;
  onActivate: (id: string) => void;
}

export const EditRegulatorDialog = ({
  regulator,
  open,
  onClose,
  onActivate,
  onDeactivate,
}: Props) => {
  const { editRegulatorJurisdiction } = useRegulators();

  // Local state for editable fields
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');

  // preload regulator details when dialog opens
  useEffect(() => {
    if (regulator) {
      setCountry(regulator.regCountry || '');
      setState(regulator.regState || '');
      setRegion(regulator.regRegion || '');
    }
  }, [regulator]);

  if (!regulator) return null;

  const handleSave = () => {
    editRegulatorJurisdiction(
      regulator.id,
      {
        country,
        state,
        region,
      },
      regulator
    );
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" /> Edit Regulator {regulator.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Update the regulator information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Region
            </Label>
            <Input
              id="region"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter region"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          {regulator.status === 'active' ? (
            <Button
              variant="destructive"
              onClick={() => onDeactivate(regulator.id)}
              className="flex items-center gap-2"
            >
              <PowerOff className="h-4 w-4" />
              Deactivate
            </Button>
          ) : (
            <Button
              onClick={() => onActivate(regulator.id)}
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
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button className="primary-button" onClick={handleSave}>
            Save Changes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
