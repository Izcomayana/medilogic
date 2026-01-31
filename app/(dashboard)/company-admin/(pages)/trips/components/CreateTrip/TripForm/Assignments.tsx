import { TripFormData } from './Tripform';
import { useUsers } from '@/hooks/useUsers';
import { useDrivers } from './useDrivers';
import { ClientSelect } from './Fields/ClientSelect';
import { DriverSelect } from './Fields/DriverSelect';

type Props = {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>;
};

export function AssignmentSection({ formData, setFormData }: Props) {
  const { users, loading: loadingClients } = useUsers();
  const { drivers, loading } = useDrivers();

  const clients = users.filter((user) => user.role === 'client');

  return (
    <div className="grid grid-cols-2 gap-4">
      <ClientSelect
        formData={formData}
        setFormData={setFormData}
        clients={clients}
        loadingClients={loadingClients}
      />

      <DriverSelect
        formData={formData}
        setFormData={setFormData}
        drivers={drivers}
        loading={loading}
      />
    </div>
  );
}
