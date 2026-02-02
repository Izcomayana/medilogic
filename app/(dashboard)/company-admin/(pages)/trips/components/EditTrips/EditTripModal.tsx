import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TripFormBase } from '@/hooks/trips/mappers';
import { X } from 'lucide-react';
import { EditTripBasics } from './components/EditTripBasics';
import { useEffect, useState } from 'react';
import { LocationSection } from '../Fields/LocationSection';
import { EditTripSchedule } from './components/EditTripSchedule';
import { MetricSection } from '../Fields/MetricSection';
import { EditTripConfig } from './components/EditTripConfig';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { EditTripCompliance } from './components/EditTripCompliance';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export type EditTripFormData = TripFormBase;

type EditTripProps = {
  isEditModalOpen: any;
  setIsEditModalOpen: any;
  selectedTrip: any;
  loading: any;
  resetForm: any;
  handleUpdateTrip: any;
};

export const createEmptyTripForm = (): TripFormBase => ({
  clientId: '',
  clientName: '',
  driverId: '',
  driverName: '',

  deliveryType: '',
  customDeliveryDescription: '',

  priority: 'normal',

  pickupLocation: '',
  dropoffLocation: '',
  dateTime: '',
  status: 'pending',

  cost: 0,
  distanceKm: '',

  vehicleType: '',
  locationZone: '',
  shiftWindow: '',

  complianceFlag: false,
  recurrenceRule: 'none',

  notes: '',
});

export function EditTripModal(props: EditTripProps) {
  const [formData, setFormData] = useState<EditTripFormData>(
    createEmptyTripForm()
  );

  const {
    isEditModalOpen,
    setIsEditModalOpen,
    selectedTrip,
    loading,
    resetForm,
    handleUpdateTrip,
  } = props;

  useEffect(() => {
    if (!selectedTrip) return;

    setFormData({
      ...createEmptyTripForm(),
      ...selectedTrip,
    });
  }, [selectedTrip]);

  const {
    isLoadingVehicleTypes,
    vehicleTypes,
    isLoadingShiftWindows,
    shiftWindows,
    isLoadingZones,
    zones,
  } = useSysConfig();

  return (
    <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>
              Edit Trip - {selectedTrip?.shortId}
            </AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <AlertDialogDescription className="text-gray-400">
            Update trip information and status.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-6 pt-4 max-h-[70vh] overflow-y-auto pr-1">
          <EditTripBasics formData={formData} setFormData={setFormData} />
          <LocationSection formData={formData} setFormData={setFormData} />
          <EditTripSchedule formData={formData} setFormData={setFormData} />
          <MetricSection formData={formData} setFormData={setFormData} />
          {/* <EditTripCosts {...props} /> */}
          <EditTripConfig
            formData={formData}
            setFormData={setFormData}
            vehicleTypes={vehicleTypes}
            zones={zones}
            isLoadingVehicleTypes={isLoadingVehicleTypes}
            isLoadingZones={isLoadingZones}
            shiftWindows={shiftWindows}
            isLoadingShiftWindows={isLoadingShiftWindows}
          />
          <EditTripCompliance formData={formData} setFormData={setFormData} />
        </div>

        <AlertDialogFooter className="border-t border-gray-700 pt-4 bg-gray-800 sticky z-20">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateTrip}
            disabled={loading}
            className="primary-button"
          >
            {loading ? <Spinner className="mx-8" /> : 'Update Trip'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
