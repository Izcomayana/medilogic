'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface Props {
  onCreate: (regData: {
    name: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    country: string;
    state: string;
    region: string;
  }) => void | Promise<void>;
}

export const CreateRegulatorDialog = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name || !email || !country || !region) {
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
        country: country.trim(),
        region: region.trim(),
        state: state.trim(),
      });
      // close only on success
      setOpen(false);
      // reset
      setName('');
      (setEmail(''), setPassword(''), setStatus('active'));
      setCountry('');
      setState('');
      setRegion('');
    } catch (error: any) {
      console.log('error:', error);
      console.log('error:', error.reponse.data);
      // onCreate should toast its own error; keep dialog open
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="primary-button cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Create Regulator
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Create New Regulator</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new regulator to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Full name"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Region
            </Label>
            <Input
              id="region"
              placeholder="e.g., North America"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              placeholder="e.g., North America"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="primary-button"
            disabled={submitting}
            onClick={handleCreate} // <-- call the function that posts to backend
          >
            {submitting ? 'Creating...' : 'Create Regulator'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
