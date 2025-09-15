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
    'Medilogic is a powerful, AI-enhanced logistics platform designed for the UK healthcare sector. It provides a secure and intelligent system to manage clinical waste transport, medical deliveries, and compliance with regulations such as GDPR, ISO 27001, and the NHS DSP Toolkit.',
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
  authors: [{ name: 'Medilogic Team', url: 'https://your-domain.com' }],
  creator: 'Medilogic',
  publisher: 'Medilogic',
  robots: 'index, follow', // allow search engines
  openGraph: {
    title: 'Medilogic',
    description:
      'Medilogic is a powerful, AI-enhanced logistics platform designed for the UK healthcare sector.',
    url: 'https://your-domain.com', // replace with actual domain
    siteName: 'Medilogic',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'https://your-domain.com/og-image.png', // create an OG image (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: 'Medilogic - AI-enhanced healthcare logistics platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medilogic',
    description:
      'AI-powered logistics platform for the UK healthcare sector — secure, compliant, and efficient.',
    site: '@yourtwitterhandle', // optional
    creator: '@yourtwitterhandle', // optional
    images: ['https://your-domain.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'Healthcare Logistics',
  alternates: {
    canonical: 'https://your-domain.com',
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