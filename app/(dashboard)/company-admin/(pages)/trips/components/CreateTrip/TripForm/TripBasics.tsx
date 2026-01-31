import { DeliveryTypeSelect } from './Fields/DeliveryTypeSelect';
import { PrioritySelect } from './Fields/PrioritySelect';
import { TripFormData } from './Tripform';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export function TripBasics({ formData, setFormData }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DeliveryTypeSelect formData={formData} setFormData={setFormData} />
      <PrioritySelect formData={formData} setFormData={setFormData} />
    </div>
  );
}
