import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Driver Dashboard',
  description: '',
};

export default function Admin({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
