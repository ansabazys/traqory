import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { CodeBlock } from '@/components/docs/code-block';

export default function CreateProviderPage() {
  return (
    <div className="mx-auto max-w-4xl sm:px-6">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Step 03
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Create a Provider
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#888888] md:text-base">
          Initialize Traqory when your application loads so analytics can start collecting events
          automatically.
        </p>
      </div>

      {/* Create Provider */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Create TraqoryProvider</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Create a provider component responsible for initializing the SDK.
        </p>

        <CodeBlock
          title="components/providers/TraqoryProvider.tsx"
          code={`'use client';

import { useEffect } from 'react';
import { init } from '@traqory/sdk';

export function TraqoryProvider() {
  useEffect(() => {
    init({
      apiKey: process.env.NEXT_PUBLIC_TRAQORY_API_KEY!,
      endpoint: process.env.NEXT_PUBLIC_TRAQORY_ENDPOINT!,

      debug: false,

      batchSize: 1,
      flushInterval: 1000,
    });
  }, []);

  return null;
}`}
        />
      </section>

      {/* Environment Variables */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Configure Environment Variables</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Add the API key and endpoint generated from your website.
        </p>

        <CodeBlock
          title=".env.local"
          code={`NEXT_PUBLIC_TRAQORY_API_KEY=trq_live_xxxxxxxxxxxxxxxxx

NEXT_PUBLIC_TRAQORY_ENDPOINT=https://traqory-ingestion-service.onrender.com/v1/events`}
          codeClassName="text-[#86efac]"
        />
      </section>

      {/* Root Layout */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Add Provider to Root Layout</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Mount the provider inside your root layout so it loads once when the application starts.
        </p>

        <CodeBlock
          title="app/layout.tsx"
          code={`import { TraqoryProvider } from '@/components/providers/TraqoryProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TraqoryProvider />

        {children}
      </body>
    </html>
  );
}`}
        />
      </section>

      {/* Verification */}
      <section className="mb-8 border border-[#14532d] bg-[#052e16] p-4 md:mb-10 md:p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#86efac]">
          Verification
        </h2>

        <p className="text-sm text-[#bbf7d0]">Start your application and visit a few pages.</p>

        <p className="mt-3 text-sm text-[#bbf7d0]">
          Within seconds, events should begin appearing in the Traqory dashboard.
        </p>
      </section>

      {/* Flow */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Initialization Flow</h2>

        <div className="border border-[#1a1a1a] bg-[#050505] p-4 md:p-5">
          <div className="overflow-x-auto font-mono text-xs text-white sm:text-sm">
            Application Starts
            <br />
            ↓
            <br />
            TraqoryProvider Mounts
            <br />
            ↓
            <br />
            SDK Initializes
            <br />
            ↓
            <br />
            Analytics Ready
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between gap-4 border-t border-[#1a1a1a] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/docs/getting-started/install-sdk"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] transition-colors hover:text-white sm:text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Install SDK
        </Link>

        <Link
          href="/docs/getting-started/track-events"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#86efac] transition-colors hover:text-white sm:text-xs"
        >
          Track Events
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
