import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export const DeliveryTypeSelect = ({ formData, setFormData }: Props) => {
  return (
    <div className="">
      <Label className="text-gray-300">Delivery Type</Label>
      <Select
        value={formData.deliveryType}
        onValueChange={(value) =>
          setFormData({ ...formData, deliveryType: value })
        }
      >
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
          <SelectValue placeholder="Select type of delivery" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          <SelectItem value="clinical_waste">Clinical Waste</SelectItem>
          <SelectItem value="documents">Documents</SelectItem>
          <SelectItem value="equipment">Equipment</SelectItem>
          <SelectItem value="samples">Samples</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      {/* If "Other" → show text area */}
      {formData.deliveryType === 'other' && (
        <div className="mt-3">
          <Label className="block text-sm font-medium mb-1">
            Custom Delivery Description
          </Label>
          <Textarea
            value={formData.customDeliveryDescription}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                customDeliveryDescription: e.target.value,
              }))
            }
            className="bg-gray-700 border-gray-600 text-white mt-2"
            rows={2}
            placeholder="Enter custom delivery details..."
          />
        </div>
      )}
    </div>
  );
};
