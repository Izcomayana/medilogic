import { Label } from '@/components/ui/label';
import { CreateTripFormData } from '../CreateTrip/TripForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PriorityLevel } from '@/hooks/trips/mappers';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

const PRIORITY_LEVELS = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'stat', label: 'Stat' },
] as const;

type Priority = typeof PRIORITY_LEVELS[number]['value'];

// const PRIORITY_LEVELS: { value: PriorityLevel; label: string }[] = [
//   { value: 'normal', label: 'Normal' },
//   { value: 'urgent', label: 'Urgent' },
//   { value: 'stat', label: 'Stat' },
// ];

// const PRIORITY_LEVELS = [
//   { value: 'normal', label: 'Normal' },
//   { value: 'urgent', label: 'Urgent' },
//   { value: 'stat', label: 'Stat' },
// ];

export const PrioritySelect = ({ formData, setFormData }: Props) => {
  return (
    <div>
      <Label className="text-gray-300">Select Priority</Label>

      <Select
        value={formData.priority}
        onValueChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            priority: value as PriorityLevel,
          }))
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
