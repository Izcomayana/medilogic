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
import { Textarea } from '@/components/ui/textarea';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export const ComplianceSection = ({ formData, setFormData }: Props) => {
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
        <div>
          <Label className="text-gray-300 mb-2">Delivery Pin</Label>
          <Select
            value={formData.deliveryPin ? 'yes' : 'no'}
            onValueChange={(v) =>
              setFormData((prev) => ({
                ...prev,
                deliveryPin: v === 'yes',
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Delivery pin?" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Pin */}
        <div className="">
          <div>
            {/* WTN Required */}
            <Label className="text-gray-300 mb-2">WTN Required</Label>
            <Select
              value={formData.wtnRequired ? 'yes' : 'no'}
              onValueChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  wtnRequired: v === 'yes',
                  wtnSerialNumber: v === 'yes' ? prev.wtnSerialNumber : '',
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="WTN required?" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* WTN Serial Dropdown (only if yes) */}
        {formData.wtnRequired && (
          <div className="space-y-2">
            <Label>WTN Serial Number</Label>
            <Input
              placeholder="Enter WTN serial number"
              value={formData.wtnSerialNumber}
              onChange={(e) =>
                setFormData((p: any) => ({
                  ...p,
                  wtnSerialNumber: e.target.value,
                }))
              }
            />
          </div>
        )}
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
