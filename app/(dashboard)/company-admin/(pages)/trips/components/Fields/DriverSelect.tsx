import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
  drivers: any;
  loading: any;
};

export const DriverSelect = ({
  formData,
  setFormData,
  drivers,
  loading,
}: Props) => {
  return (
    <>
      <div>
        <Label htmlFor="driverAssigned" className="text-gray-300">
          Assign Driver
        </Label>
        <Select
          value={formData.driverId}
          onValueChange={(value) => {
            const selectedDriver = drivers.find(
              (d: { id: string }) => d.id === value
            );
            setFormData({
              ...formData,
              driverId: value,
              driverName: selectedDriver ? selectedDriver.name : '',
            });
          }}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
            <SelectValue
              placeholder={loading ? 'Loading drivers...' : 'Select driver'}
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {drivers.length > 0 ? (
              drivers.map((driver: any) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))
            ) : (
              <div className="text-gray-400 text-sm p-2 italic">
                No drivers found <br /> kindly register a driver first.
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="driver" className="text-gray-300">
          Driver Name
        </Label>
        <Input
          id="driver"
          value={formData.driverName}
          onChange={(e) =>
            setFormData({ ...formData, driverName: e.target.value })
          }
          placeholder="Enter driver name"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
    </>
  );
};
