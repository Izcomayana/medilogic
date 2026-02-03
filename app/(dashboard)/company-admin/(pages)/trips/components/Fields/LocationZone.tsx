import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
  zones: any;
  isLoadingZones: any;
};

export const LocationZone = ({
  formData,
  setFormData,
  zones,
  isLoadingZones,
}: Props) => {
  return (
    <div>
      <Label htmlFor="locationZone" className="text-gray-300">
        Location Zone
      </Label>
      <Select
        value={formData.locationZone}
        onValueChange={(value) => {
          setFormData({
            ...formData,
            locationZone: value,
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
  );
};
