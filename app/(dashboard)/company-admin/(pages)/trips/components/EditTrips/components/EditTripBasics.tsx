import { useUsers } from '@/hooks/useUsers';
import { EditTripFormData } from '../EditTripModal';
import { ClientSelect } from '../../Fields/ClientSelect';
import { DriverSelect } from '../../Fields/DriverSelect';
import { DeliveryTypeSelect } from '../../Fields/DeliveryTypeSelect';
import { PrioritySelect } from '../../Fields/PrioritySelect';

type Props = {
  formData: EditTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditTripFormData>>;
};

export function EditTripBasics({ formData, setFormData }: Props) {
  const { users, loading } = useUsers();

  const drivers = users.filter((u) => u.role === 'driver');
  const clients = users.filter((u) => u.role === 'client');

  return (
    <div className="grid grid-cols-2 gap-4">
      <ClientSelect
        clients={clients}
        loadingClients={loading}
        formData={formData}
        setFormData={setFormData}
      />

      <DriverSelect
        drivers={drivers}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
      />

      <DeliveryTypeSelect formData={formData} setFormData={setFormData} />

      <PrioritySelect formData={formData} setFormData={setFormData} />
    </div>
  );
}
