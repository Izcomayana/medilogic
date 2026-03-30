import { RoleGuard } from '@/components/RoleGuard';
import { ClientDashboard } from '.';

export default function Page() {
  return (
    <RoleGuard allowedRoles={['client']}>
      <ClientDashboard />
    </RoleGuard>
  );
}
