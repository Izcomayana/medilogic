import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { AssignmentSection } from './components/Assignments';
import { ConfigSection } from './components/ConfigSection';
import { LocationSection } from '../../Fields/LocationSection';
import { MetricSection } from '../../Fields/MetricSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TripBasics } from './components/TripBasics';
import { ComplianceSection } from './components/ComplianceSection';
import { TripFormBase } from '@/hooks/trips/mappers';

export type CreateTripFormData = TripFormBase & {
  deliveryPin?: boolean;
  wtnRequired?: boolean;
  wtnSerialNumber?: string;
};

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
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
    <div className="grid gap-6 max-h-[70vh] overflow-y-auto">
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
