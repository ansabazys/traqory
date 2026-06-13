'use client';

import { redirect } from 'next/navigation';
import { useSession } from '@/hooks/auth/use-session';
import { Loader } from 'lucide-react';
import HeroSection from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/feature-section';
import { DashboardPreviewSection } from '@/components/landing/dashboard-preview-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';

export default function HomePage() {
  const { data, isLoading } = useSession();

  if (data) {
    redirect('/overview');
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {' '}
        <Loader className="text-neutral-500 animate-spin"></Loader>{' '}
      </div>
    );
  }

  return (
    <main>
      <HeroSection />
      <FeaturesSection/>
      <DashboardPreviewSection />
      <HowItWorksSection />
    </main>
  );
}
