// import { RoleGuard } from "@/components/RoleGuard";
import { AdminDashboard } from '.';

export default function Page() {
  return (
    // <RoleGuard allowedRoles={["admin"]}>
    <AdminDashboard />
    // </RoleGuard>
  );
}
