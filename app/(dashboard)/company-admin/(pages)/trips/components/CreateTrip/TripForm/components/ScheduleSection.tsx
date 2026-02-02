import { CreateTripFormData } from '..';
import { TripTime } from '../../../Fields/TripTime';
import { StatusSelect } from '../../../Fields/Status';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
};

export const ScheduleSection = ({ formData, setFormData }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TripTime formData={formData} setFormData={setFormData} />

      <StatusSelect formData={formData} setFormData={setFormData} />
    </div>
  );
};
