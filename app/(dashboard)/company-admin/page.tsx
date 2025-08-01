import { RoleGuard } from "@/components/RoleGuard";
import { CompanyAdmin } from ".";

export default function Page() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <CompanyAdmin />
    </RoleGuard>
  );
}
