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
};

export const Compliance = ({ formData, setFormData }: Props) => {
  return (
    <div>
      <Label htmlFor="complianceFlag" className="text-gray-300">
        Compliance
      </Label>
      <Select
        value={String(formData.complianceFlag)}
        onValueChange={(value) =>
          setFormData({ ...formData, complianceFlag: value === 'true' })
        }
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
