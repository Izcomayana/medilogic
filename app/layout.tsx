import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from '../components/Providers';
import { AuthProvider } from '@/components/auth';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Medilogic',
  description:
    'Medilogic is a powerful, AI-enhanced logistics platform designed for the UK healthcare sector...',
  keywords: [
    'Medilogic',
    'Healthcare Logistics',
    'Medical Deliveries',
    'Clinical Waste Transport',
    'NHS DSP Toolkit',
    'GDPR Compliance',
    'ISO 27001',
    'AI Logistics',
    'Healthcare Technology',
    'UK Healthcare',
  ],
  authors: [{ name: 'Medilogic Team', url: 'www.medilogicglobal.co.uk' }],
  creator: 'Medilogic',
  publisher: 'Medilogic',
  robots: 'index, follow',

  openGraph: {
    title: 'Medilogic',
    description:
      'Medilogic is a powerful, AI-enhanced logistics platform designed for the UK healthcare sector.',
    url: 'www.medilogicglobal.co.uk',
    siteName: 'Medilogic',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'www.medilogicglobal.co.uk/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Medilogic - AI-enhanced healthcare logistics platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Medilogic',
    description: 'AI-powered logistics platform for the UK healthcare sector',
    images: ['www.medilogicglobal.co.uk/og-image.png'],
  },

  // ✅ FIXED HERE
  icons: {
    icon: '/favicon.svg',
  },

  manifest: '/site.webmanifest',
  category: 'Healthcare Logistics',
  alternates: {
    canonical: 'www.medilogicglobal.co.uk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} montserrat antialiased`}>
        <AuthProvider>
          <Providers>{children}</Providers>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
