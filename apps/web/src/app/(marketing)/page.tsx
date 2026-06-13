'use client';

import { redirect } from 'next/navigation';
import { useSession } from '@/hooks/auth/use-session';
import { Loader } from 'lucide-react';
import Globe from '@/components/ui/globe';
import Link from 'next/link';

export const globeMarkers = [
  {
    id: 'us',
    label: 'United States',
    countryCode: 'US',
    location: [37.0902, -95.7129] as [number, number],
    size: 0.18,
  },
  {
    id: 'in',
    label: 'India',
    countryCode: 'IN',
    location: [20.5937, 78.9629] as [number, number],
    size: 0.16,
  },
  {
    id: 'gb',
    label: 'United Kingdom',
    countryCode: 'GB',
    location: [55.3781, -3.436] as [number, number],
    size: 0.14,
  },
  {
    id: 'de',
    label: 'Germany',
    countryCode: 'DE',
    location: [51.1657, 10.4515] as [number, number],
    size: 0.13,
  },
  {
    id: 'sg',
    label: 'Singapore',
    countryCode: 'SG',
    location: [1.3521, 103.8198] as [number, number],
    size: 0.12,
  },
  {
    id: 'jp',
    label: 'Japan',
    countryCode: 'JP',
    location: [36.2048, 138.2529] as [number, number],
    size: 0.11,
  },
  {
    id: 'au',
    label: 'Australia',
    countryCode: 'AU',
    location: [-25.2744, 133.7751] as [number, number],
    size: 0.1,
  },
  {
    id: 'br',
    label: 'Brazil',
    countryCode: 'BR',
    location: [-14.235, -51.9253] as [number, number],
    size: 0.1,
  },
];

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

  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="relative z-20 flex flex-col items-center px-5 pt-20 md:pt-32">
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888] md:mb-6">
          Realtime Analytics Infrastructure
        </p>

        <h1 className="max-w-5xl text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Track every event.
          <br />
          Understand every user.
        </h1>

        <p className="mt-5 max-w-md text-center text-sm leading-relaxed text-[#a1a1aa] md:mt-6 md:max-w-xl md:text-base">
          Collect events, monitor traffic in realtime, and understand product behavior with a
          lightweight analytics platform built for modern applications.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 font-mono uppercase sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="
        flex
        h-10
        items-center
        justify-center
        gap-2
        border
        border-[#14532d]
        bg-[#052e16]
        px-5
        text-xs
        tracking-widest
        text-[#86efac]
        transition-colors
        hover:bg-[#064e23]
        w-full sm:w-auto
      "
          >
            Get Started
          </Link>

          <Link
            href="/docs"
            className="
        flex
        h-10
        items-center
        justify-center
        border
        border-[#1a1a1a]
        bg-[#0a0a0a]
        px-5
        text-xs
        tracking-widest
        text-white
        transition-colors
        hover:bg-[#111111]
        w-full sm:w-auto
      "
          >
            View Docs
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-sm grid-cols-3 gap-4 font-mono uppercase md:mt-12 md:flex md:w-auto md:gap-10">
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">23.4M+</div>
            <div className="text-[10px] tracking-widest text-[#888888]">Events</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold text-white">98</div>
            <div className="text-[10px] tracking-widest text-[#888888]">Countries</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold text-white">12ms</div>
            <div className="text-[10px] tracking-widest text-[#888888]">Latency</div>
          </div>
        </div>
      </section>

      <section className="absolute z-10 top-56 md:top-40 flex w-full justify-center overflow-hidden">
        <Globe markers={globeMarkers} />
      </section>
    </main>
  );
}
