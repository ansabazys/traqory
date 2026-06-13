import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TrackEventsPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Step 04
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">Track Events</h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#888888]">
          Start sending analytics events from your application and monitor them in realtime through
          the Traqory dashboard.
        </p>
      </div>

      {/* Import */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Import Track</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Import the tracking function anywhere in your application.
        </p>

        <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
          <div className="border-b border-[#1a1a1a] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
            Example
          </div>

          <pre className="overflow-x-auto p-5 text-sm text-white">
            {`import { track } from '@traqory/sdk';`}
          </pre>
        </div>
      </section>

      {/* Basic Event */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Track a Basic Event</h2>

        <p className="mb-4 text-sm text-[#888888]">Send a simple event with a descriptive name.</p>

        <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
          <div className="border-b border-[#1a1a1a] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
            Example
          </div>

          <pre className="overflow-x-auto p-5 text-sm text-white">{`track('signup');`}</pre>
        </div>
      </section>

      {/* Button Example */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Track Button Clicks</h2>

        <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
          <div className="border-b border-[#1a1a1a] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
            React Example
          </div>

          <pre className="overflow-x-auto p-5 text-sm text-white">
            {`<button
  onClick={() => {
    track('cta_clicked');
  }}
>
  Get Started
</button>`}
          </pre>
        </div>
      </section>

      {/* Event Properties */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Event Properties</h2>

        <p className="mb-4 text-sm text-[#888888]">Attach additional metadata to your events.</p>

        <div className="overflow-hidden border border-[#1a1a1a] bg-[#050505]">
          <div className="border-b border-[#1a1a1a] px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
            Example
          </div>

          <pre className="overflow-x-auto p-5 text-sm text-white">
            {`track('purchase_completed', {
  amount: 99,
  currency: 'USD',
  plan: 'Pro',
});`}
          </pre>
        </div>
      </section>

      {/* SaaS Examples */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">Common SaaS Events</h2>

        <div className="border border-[#1a1a1a] bg-[#050505] p-5">
          <ul className="space-y-3 font-mono text-sm text-white">
            <li>signup</li>
            <li>login</li>
            <li>workspace_created</li>
            <li>subscription_upgraded</li>
            <li>checkout_started</li>
            <li>purchase_completed</li>
            <li>api_key_generated</li>
          </ul>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-white">View Events</h2>

        <p className="mb-4 text-sm text-[#888888]">
          Once events are sent, they will appear in the dashboard.
        </p>

        <div className="flex h-72 items-center justify-center border border-dashed border-[#1a1a1a] bg-[#050505]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            Events Dashboard Screenshot
          </span>
        </div>
      </section>

      {/* Success */}
      <section className="mb-10 border border-[#14532d] bg-[#052e16] p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#86efac]">
          Setup Complete
        </h2>

        <p className="text-sm text-[#bbf7d0]">
          Congratulations. Traqory is now collecting analytics from your application.
        </p>

        <p className="mt-3 text-sm text-[#bbf7d0]">
          Continue to the SDK documentation to learn more advanced features.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-8">
        <Link
          href="/docs/getting-started/create-provider"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#888888] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Create Provider
        </Link>

        <Link
          href="/docs/sdk"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#86efac]"
        >
          SDK Documentation
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
