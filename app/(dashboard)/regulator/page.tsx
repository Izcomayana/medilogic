import { RoleGuard } from '@/components/RoleGuard';
import { RegulatorDashboard } from '.';

export default function Page() {
  return (
    <RoleGuard allowedRoles={['regulator']}>
      <RegulatorDashboard />
    </RoleGuard>
  );
}
