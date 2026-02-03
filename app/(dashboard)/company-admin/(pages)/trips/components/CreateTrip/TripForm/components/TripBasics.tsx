import { DeliveryTypeSelect } from '../../../Fields/DeliveryTypeSelect';
import { PrioritySelect } from '../../../Fields/PrioritySelect';
import { CreateTripFormData } from '..';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export function TripBasics({ formData, setFormData }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DeliveryTypeSelect formData={formData} setFormData={setFormData} />
      <PrioritySelect formData={formData} setFormData={setFormData} />
    </div>
  );
}
