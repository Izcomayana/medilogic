import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export const TripTime = ({ formData, setFormData }: Props) => {
  return (
    <div>
      <Label htmlFor="datetime" className="text-gray-300">
        Trip Date & Time
      </Label>
      <Input
        id="datetime"
        type="datetime-local"
        value={formData.dateTime}
        onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
        className="bg-gray-700 border-gray-600 text-white mt-2"
      />
    </div>
  );
};
