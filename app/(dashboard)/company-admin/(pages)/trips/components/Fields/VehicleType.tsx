import { TripFormData } from '../CreateTrip/TripForm';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
  vehicleTypes: any;
  isLoadingVehicleTypes: any;
};

export const VehicleTypeSelect = ({
  formData,
  setFormData,
  vehicleTypes,
  isLoadingVehicleTypes,
}: Props) => {
  return (
    <div>
      <Label htmlFor="vehicleType" className="text-gray-300">
        Vehicle Type
      </Label>
      <Select
        value={formData.vehicleType}
        onValueChange={(value) => {
          setFormData({
            ...formData,
            vehicleType: value,
          });
        }}
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue
            placeholder={
              isLoadingVehicleTypes ? 'Loading vehicles...' : 'Select vehicle'
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          {vehicleTypes.length > 0 ? (
            vehicleTypes.map((vehicle: any) => (
              <SelectItem key={vehicle.id} value={vehicle.name.toLowerCase()}>
                {vehicle.name}
              </SelectItem>
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2 italic">
              No vehicle levels found <br /> add one in your System Config.
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
