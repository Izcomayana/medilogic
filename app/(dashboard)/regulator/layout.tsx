import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulator Dashboard',
  description:
    'A centralized dashboard enabling regulators to monitor incident reports, ensure compliance, and manage oversight responsibilities.',
};

export default function Regulator({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
