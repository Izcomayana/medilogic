import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medilogic Driver Dashboard',
  description: '',
};

export default function MedilogicDriver({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
