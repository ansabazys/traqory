'use client';

import { redirect } from 'next/navigation';
import LoginPage from './(auth)/login/page';
import { useSession } from '@/hooks/auth/use-session';
import { Loader } from 'lucide-react';

export default function HomePage() {
  const { data, isLoading } = useSession();

  if (data) {
    redirect('/overview');
  }

  // return <LandingPage />;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {' '}
        <Loader className="text-neutral-500 animate-spin"></Loader>{' '}
      </div>
    );
  }

  return <LoginPage />;
}
