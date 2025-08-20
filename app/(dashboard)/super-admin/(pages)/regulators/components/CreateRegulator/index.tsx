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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export const CreateRegulatorDialog = () => {
  const [open, setOpen] = useState(false);

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
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="primary-button"
            onClick={() => {
              toast.success('Regulator created successfully');
              setOpen(false);
            }}
          >
            Create Regulator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
