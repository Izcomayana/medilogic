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
};

export const ScheduleSection = ({ formData, setFormData }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="datetime" className="text-gray-300">
          Trip Date & Time
        </Label>
        <Input
          id="datetime"
          type="datetime-local"
          value={formData.dateTime}
          onChange={(e) =>
            setFormData({ ...formData, dateTime: e.target.value })
          }
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
      <div className="">
        <Label htmlFor="status" className="text-gray-300">
          Status
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
