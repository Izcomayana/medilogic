import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export const NoteArea = ({ formData, setFormData }: Props) => {
  return (
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
  );
};
