import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './globals.css';

import { QueryProvider } from '@/providers';
import { LenisProvider } from '@/providers/lenis-provider';

export const metadata: Metadata = {
  title: 'Traqory',
  description: 'Modern website analytics platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className={`${GeistSans.className} font-sans antialiased`}>
        <QueryProvider>
          <LenisProvider>{children}</LenisProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
