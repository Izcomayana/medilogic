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
  shiftWindows: any;
  isLoadingShiftWindows: any;
};

export const ShiftWindowSelect = ({
  formData,
  setFormData,
  shiftWindows,
  isLoadingShiftWindows,
}: Props) => {
  return (
    <div>
      <Label htmlFor="shiftWindow" className="text-gray-300">
        Shift Window
      </Label>
      <Select
        value={formData.shiftWindow}
        onValueChange={(value) => {
          setFormData({
            ...formData,
            shiftWindow: value,
          });
        }}
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue
            placeholder={
              isLoadingShiftWindows ? 'Loading shifts...' : 'Select shift'
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          {shiftWindows.length > 0 ? (
            shiftWindows.map((shift: any) => (
              <SelectItem key={shift.id} value={shift.name.toLowerCase()}>
                {shift.name}
              </SelectItem>
            ))
          ) : (
            <div className="text-gray-400 text-sm p-2 italic">
              No shift windows found <br /> add one in your System Config.
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
