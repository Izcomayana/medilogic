import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EditTripFormData } from '../EditTripModal';

type Props = {
  formData: EditTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditTripFormData>>;
};

export const EditTripCompliance = ({ formData, setFormData }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes" className="text-gray-300">
          Notes / Special Instructions
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Enter any special instructions or notes"
          className="bg-gray-700 border-gray-600 text-white mt-2"
          rows={3}
        />
      </div>
    </>
  );
};
