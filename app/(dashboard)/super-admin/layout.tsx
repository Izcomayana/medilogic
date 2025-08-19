import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medilogic: Super Admin Dashboard',
  description:
    'Comprehensive admin dashboard for managing organizations, users, and regulators',
};

export default function SuperAdmin({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
