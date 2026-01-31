import { TripFormData } from './Tripform';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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

      <div>
        <Label htmlFor="locationZone" className="text-gray-300">
          Location Zone
        </Label>
        <Select
          value={formData.locationZone}
          onValueChange={(value) => {
            // const selectedZones = zones.find((z: any) => z.name === value);
            setFormData({
              ...formData,
              locationZone: value,
              // zone: value,
              // zoneName: selectedZones ? selectedZones.name : '',
            });
          }}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
            <SelectValue
              placeholder={isLoadingZones ? 'Loading zones...' : 'Select zone'}
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {zones.length > 0 ? (
              zones.map((zone: any) => (
                <SelectItem key={zone.id} value={zone.name.toLowerCase()}>
                  {zone.name}
                </SelectItem>
              ))
            ) : (
              <div className="text-gray-400 text-sm p-2 italic">
                No zone found <br /> add one in your System Config.
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="shiftWindow" className="text-gray-300">
          Shift Window
        </Label>
        <Select
          value={formData.shiftWindow}
          onValueChange={(value) => {
            setFormData({
              ...formData,
              shiftWindow: value,
            });
          }}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
            <SelectValue
              placeholder={
                isLoadingShiftWindows ? 'Loading shifts...' : 'Select shift'
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {shiftWindows.length > 0 ? (
              shiftWindows.map((shift: any) => (
                <SelectItem key={shift.id} value={shift.name.toLowerCase()}>
                  {shift.name}
                </SelectItem>
              ))
            ) : (
              <div className="text-gray-400 text-sm p-2 italic">
                No shift windows found <br /> add one in your System Config.
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
