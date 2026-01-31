import { Label } from '@/components/ui/label';
import { TripFormData } from '../Tripform';
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
};

const PRIORITY_LEVELS = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'stat', label: 'stat' },
];

export const PrioritySelect = ({ formData, setFormData }: Props) => {
  return (
    <div>
      <Label className="text-gray-300">Select Priority</Label>

      <Select
        value={formData.priority}
        onValueChange={(value) =>
          setFormData({
            ...formData,
            priority: value,
          })
        }
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>

        <SelectContent className="bg-gray-700 border-gray-600">
          {PRIORITY_LEVELS.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
