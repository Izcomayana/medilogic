import { TripFormData } from './Tripform';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export const MetricSection = ({ formData, setFormData }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="cost" className="text-gray-300">
          Cost
        </Label>
        <Input
          id="cost"
          type="number"
          value={formData.cost}
          onChange={(e) =>
            setFormData({ ...formData, cost: Number(e.target.value) })
          }
          placeholder="Enter cost"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
      <div>
        <Label htmlFor="distanceKm" className="text-gray-300">
          Distance (km)
        </Label>
        <Input
          id="distanceKm"
          type="text"
          value={formData.distanceKm}
          onChange={(e) =>
            setFormData({
              ...formData,
              distanceKm: Number(e.target.value),
            })
          }
          placeholder="Enter distance in km"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
    </div>
  );
};
