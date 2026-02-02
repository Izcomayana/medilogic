import { LocationZone } from '../../Fields/LocationZone';
import { ShiftWindowSelect } from '../../Fields/ShiftWindow';
import { VehicleTypeSelect } from '../../Fields/VehicleType';
import { EditTripFormData } from '../EditTripModal';

type Props = {
  formData: EditTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditTripFormData>>;
  vehicleTypes: any;
  zones: any;
  isLoadingVehicleTypes: any;
  isLoadingZones: any;
  shiftWindows: any;
  isLoadingShiftWindows: any;
};

export const EditTripConfig = ({
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
