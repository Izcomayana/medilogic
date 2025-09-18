import { RoleGuard } from '@/components/RoleGuard';
import { Client } from '.';

export default function Page() {
  return (
    <RoleGuard allowedRoles={['client']}>
      <Client />
    </RoleGuard>
  );
}
