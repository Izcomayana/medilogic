import * as React from 'react';
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
import { useTrips } from '@/hooks/trips/useTrips';
import { Download, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripForm from './TripForm';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

type CreateTripProps = ReturnType<typeof useTrips>;

export function CreateTrips({
  isCreateModalOpen,
  setIsCreateModalOpen,
  // filteredTrips,
  formData,
  setFormData,
  drivers,
  handleCreateTrip,
  loading,
  handleExport,
}: CreateTripProps) {
  return (
    <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <div className="flex flex-col md:flex-row mt-4 lg:mt-0 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-gray-700" variant="outline">
              Export Trips
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4" />
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogTrigger asChild>
          <Button className="primary-button">
            <Plus className="h-4 w-4" />
            New Trip{' '}
          </Button>
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white !max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Create New Trip</AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsCreateModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-gray-400">
            Schedule a new waste collection or delivery trip.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <TripForm
          formData={formData}
          setFormData={setFormData}
          drivers={drivers}
        />

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsCreateModalOpen(false)}
            className="text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTrip}
            className="primary-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Trip'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
