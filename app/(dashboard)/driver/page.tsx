import { RoleGuard } from "@/components/RoleGuard";
import { Driver } from ".";

export default function Page() {
  return (
        <RoleGuard allowedRoles={["driver"]}>
      <Driver />
    </RoleGuard>
  )
}
