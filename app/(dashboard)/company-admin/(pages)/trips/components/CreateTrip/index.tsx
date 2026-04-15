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
import { Plus, X, Package, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripForm, { CreateTripFormData } from './TripForm';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { ExportTripsDialog } from '../ExportTrip';
import { BillingModal } from '@/app/(dashboard)/components/Billing';
import { useBillingAccess } from '@/hooks/useBillingAccess';

type CreateTripsProps = ReturnType<typeof useTrips> & {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export function CreateTrips({
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  handleCreateTrip,
  loading,
  handleExport,
}: CreateTripsProps) {
  const isSubmitDisabled = loading || !formData.clientId || !formData.dateTime;

  const { requireAccess, showBillingModal, setShowBillingModal } =
    useBillingAccess();

  const handleOpenCreateTrip = () => {
    requireAccess(() => {
      setIsCreateModalOpen(true);
    });
  };

  return (
    <>
      <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <div className="flex flex-col md:flex-row mt-4 lg:mt-0 gap-2">
          <Link href={'/company-admin/coc'} className="cursor-pointer">
            <Button className="text-gray-700" variant="outline">
              <Link2 className="h-4 w-4" />
              COC{' '}
            </Button>
          </Link>
          <Link href={'/company-admin/pods'} className="cursor-pointer">
            <Button className="text-gray-700" variant="outline">
              <Package className="h-4 w-4" />
              PODs{' '}
            </Button>
          </Link>

          <ExportTripsDialog onExport={handleExport} />

          <Button className="primary-button" onClick={handleOpenCreateTrip}>
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </div>

        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-3xl">
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

          <TripForm formData={formData} setFormData={setFormData} />

          <AlertDialogFooter className="border-t border-gray-700 pt-4 bg-gray-800 sticky z-20">
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
              disabled={isSubmitDisabled}
            >
              {loading ? <Spinner className="mx-8" /> : 'Create Trip'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showBillingModal && (
        <BillingModal
          open={showBillingModal}
          onClose={() => setShowBillingModal(false)}
          onSuccess={() => {
            setShowBillingModal(false);
            setIsCreateModalOpen(true); // resume flow
          }}
        />
      )}
    </>
  );
}
