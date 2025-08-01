"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RoleGuard({ allowedRoles, children }: any) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole || !allowedRoles.includes(storedRole)) {
      router.replace("/login");
    } else {
      setRole(storedRole);
    }
  }, [allowedRoles, router]);

  if (!role) return null; // or a spinner

  return <>{children}</>;
}
