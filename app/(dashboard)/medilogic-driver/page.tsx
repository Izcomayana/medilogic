import { RoleGuard } from '@/components/RoleGuard';
import { MedilogicDriver } from '.';

export default function Page() {
  return (
    <RoleGuard allowedRoles={['medilogic_driver']}>
      <MedilogicDriver />
    </RoleGuard>
  );
}
