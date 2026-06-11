'use client';

import { WebsiteGate } from '@/components/shared/website-gate';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebsiteGate>
      {children}
    </WebsiteGate>
  );
}