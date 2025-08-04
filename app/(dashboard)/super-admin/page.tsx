import React from "react";
import SuperAdmin from ".";
// import { RoleGuard } from "@/components/RoleGuard";

export default function Page() {
  return (
    // <RoleGuard allowedRoles={["super_admin"]}>
    <SuperAdmin />
    // </RoleGuard>
  );
}
