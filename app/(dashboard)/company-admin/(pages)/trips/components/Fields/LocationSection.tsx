import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export const LocationSection = ({ formData, setFormData }: Props) => {
  return (
    <>
      <div>
        <Label htmlFor="pickup" className="text-gray-300">
          Pickup Address
        </Label>
        <Input
          id="pickup"
          value={formData.pickupLocation}
          onChange={(e) =>
            setFormData({ ...formData, pickupLocation: e.target.value })
          }
          placeholder="Enter pickup location"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
      <div>
        <Label htmlFor="dropoff" className="text-gray-300">
          Dropoff Address
        </Label>
        <Input
          id="dropoff"
          value={formData.dropoffLocation}
          onChange={(e) =>
            setFormData({ ...formData, dropoffLocation: e.target.value })
          }
          placeholder="Enter dropoff location"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
    </>
  );
};
