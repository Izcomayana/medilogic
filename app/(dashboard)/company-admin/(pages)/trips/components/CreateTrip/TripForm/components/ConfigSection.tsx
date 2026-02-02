import { CreateTripFormData } from '..';
import { VehicleTypeSelect } from '../../../Fields/VehicleType';
import { LocationZone } from '../../../Fields/LocationZone';
import { ShiftWindowSelect } from '../../../Fields/ShiftWindow';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
  vehicleTypes: any;
  zones: any;
  isLoadingVehicleTypes: any;
  isLoadingZones: any;
  shiftWindows: any;
  isLoadingShiftWindows: any;
};

export const ConfigSection = ({
  formData,
  setFormData,
  vehicleTypes,
  zones,
  isLoadingVehicleTypes,
  isLoadingZones,
  shiftWindows,
  isLoadingShiftWindows,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <VehicleTypeSelect
        formData={formData}
        setFormData={setFormData}
        vehicleTypes={vehicleTypes}
        isLoadingVehicleTypes={isLoadingVehicleTypes}
      />

      <LocationZone
        formData={formData}
        setFormData={setFormData}
        zones={zones}
        isLoadingZones={isLoadingZones}
      />

      <ShiftWindowSelect
        formData={formData}
        setFormData={setFormData}
        shiftWindows={shiftWindows}
        isLoadingShiftWindows={isLoadingShiftWindows}
      />
    </div>
  );
};
