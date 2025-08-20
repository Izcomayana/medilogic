import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medilogic: Admin Dashboard',
  description:
    'Comprehensive admin dashboard for managing organizations, users, and regulators',
};

export default function Admin({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
