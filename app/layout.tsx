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
