import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { AssignmentSection } from './Assignments';
import { ConfigSection } from './ConfigSection';
import { LocationSection } from './LocationSection';
import { MetricSection } from './MetricSection';
import { ScheduleSection } from './ScheduleSection';
import { TripBasics } from './TripBasics';
import { ComplianceSection } from './ComplianceSection';

export type TripFormData = {
  deliveryType: string;
  priority: string;
  clientId: string;
  clientName: string;
  driverId: string;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  dateTime: string;
  status: string;
  cost: number;
  distanceKm: number;
  vehicleType: string;
  locationZone: string;
  shiftWindow: string;
  complianceFlag: boolean;
  recurrenceRule: string;
  deliveryPin: boolean;
  wtnRequired: boolean;
  wtnSerialNumber: string;
  notes: string;
  customDeliveryDescription: string;
};

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export default function TripForm({ formData, setFormData }: Props) {
  const {
    isLoadingVehicleTypes,
    vehicleTypes,
    isLoadingShiftWindows,
    shiftWindows,
    isLoadingZones,
    zones,
  } = useSysConfig();

  return (
    <div className="grid gap-6 max-h-[65vh] overflow-y-auto">
      <TripBasics formData={formData} setFormData={setFormData} />
      <AssignmentSection formData={formData} setFormData={setFormData} />
      <LocationSection formData={formData} setFormData={setFormData} />
      <ScheduleSection formData={formData} setFormData={setFormData} />
      <MetricSection formData={formData} setFormData={setFormData} />
      <ConfigSection
        formData={formData}
        setFormData={setFormData}
        vehicleTypes={vehicleTypes}
        zones={zones}
        isLoadingVehicleTypes={isLoadingVehicleTypes}
        isLoadingZones={isLoadingZones}
        shiftWindows={shiftWindows}
        isLoadingShiftWindows={isLoadingShiftWindows}
      />
      <ComplianceSection formData={formData} setFormData={setFormData} />
    </div>
  );
}
