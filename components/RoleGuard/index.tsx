'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      router.replace('/login');
    }

    setLoading(false);
  }, [role, isLoggedIn, allowedRoles, router]);

  if (loading)
    return (
      <div className="p-4">
        <p className="text-sm text-white font-semibold">
          Unauthorized route <br />{' '}
        </p>
        Redirecting...
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    );

  return <>{children}</>;
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function RoleGuard({ allowedRoles, children }: any) {
//   const router = useRouter();
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const storedRole = localStorage.getItem("userRole");
//     if (!storedRole || !allowedRoles.includes(storedRole)) {
//       router.replace("/login");
//     } else {
//       setRole(storedRole);
//     }
//   }, [allowedRoles, router]);

//   if (!role) return null; // or a spinner

//   return <>{children}</>;
// }
