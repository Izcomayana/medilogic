import { StatusSelect } from '../../Fields/Status';
import { TripTime } from '../../Fields/TripTime';
import { EditTripFormData } from '../EditTripModal';

type Props = {
  formData: EditTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditTripFormData>>;
};

export const EditTripSchedule = ({ formData, setFormData }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TripTime formData={formData} setFormData={setFormData} />

      <StatusSelect formData={formData} setFormData={setFormData} />
    </div>
  );
};
