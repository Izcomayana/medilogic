import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export const Recurrence = ({ formData, setFormData }: Props) => {
  return (
    <div>
      <Label htmlFor="recurrenceRule" className="text-gray-300">
        Recurrence
      </Label>
      <Select
        value={formData.recurrenceRule}
        onValueChange={(value) =>
          setFormData({ ...formData, recurrenceRule: value })
        }
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue placeholder="Select recurrence" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
