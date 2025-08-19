import { ReactNode } from 'react';
import { PageTransition } from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import { Footer } from '../../components/Footer';

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
