import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create Website',
    description: 'Create a website project and generate your API credentials.',
    href: '/docs/getting-started/create-website',
  },
  {
    number: '02',
    title: 'Install SDK',
    description: 'Add the Traqory SDK to your application.',
    href: '/docs/getting-started/install-sdk',
  },
  {
    number: '03',
    title: 'Create Provider',
    description: 'Initialize Traqory when your application loads.',
    href: '/docs/getting-started/create-provider',
  },
  {
    number: '04',
    title: 'Track Events',
    description: 'Start collecting analytics from your users.',
    href: '/docs/getting-started/track-events',
  },
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Getting Started
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Integrate Traqory in minutes
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#888888]">
          Follow the guided setup process to install the SDK, configure your
          project, and start tracking events in less than five minutes.
        </p>

        <Link
          href="/docs/getting-started/create-website"
          className="
            mt-8
            inline-flex
            h-10
            items-center
            gap-2
            border
            border-[#14532d]
            bg-[#052e16]
            px-5
            font-mono
            text-xs
            uppercase
            tracking-widest
            text-[#86efac]
            transition-colors
            hover:bg-[#064e23]
          "
        >
          Start Setup
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* What You'll Get */}
      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="border border-[#1a1a1a] bg-[#050505] p-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
            Analytics
          </div>

          <p className="text-sm text-[#888888]">
            Track page views, visitors, sessions and custom events.
          </p>
        </div>

        <div className="border border-[#1a1a1a] bg-[#050505] p-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
            Realtime
          </div>

          <p className="text-sm text-[#888888]">
            Monitor live traffic and active visitors instantly.
          </p>
        </div>

        <div className="border border-[#1a1a1a] bg-[#050505] p-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
            Insights
          </div>

          <p className="text-sm text-[#888888]">
            Understand user behavior across countries and devices.
          </p>
        </div>
      </section>

      {/* Setup Stats */}
      {/* <section className="mb-10 border border-[#1a1a1a] bg-[#050505] p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
          Estimated Setup
        </div>

        <div className="mt-4 flex items-center gap-10">
          <div>
            <div className="text-3xl font-semibold text-white">&lt; 5 min</div>

            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
              Setup Time
            </div>
          </div>

          <div>
            <div className="text-3xl font-semibold text-white">4</div>

            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
              Steps
            </div>
          </div>
        </div>
      </section> */}

      {/* Setup Flow */}
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-white">
          Setup Flow
        </h2>

        <div className="space-y-4">
          {steps.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="
                group
                block
                border
                border-[#1a1a1a]
                bg-[#050505]
                p-6
                transition-colors
                hover:border-[#2a2a2a]
                hover:bg-[#080808]
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
                    Step {step.number}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#888888]">
                    {step.description}
                  </p>
                </div>

                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#666666] transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Before You Start */}
      <section className="mb-12 border border-[#14532d] bg-[#052e16] p-5">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-[#86efac]">
          Before You Start
        </h2>

        <p className="text-sm text-[#bbf7d0]">
          You'll need a Traqory account and access to the dashboard to create
          your first website and generate API credentials.
        </p>
      </section>

      {/* Bottom Navigation */}
      <div className="border-t border-[#1a1a1a] pt-8">
        <Link
          href="/docs/getting-started/create-website"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#86efac] transition-colors hover:text-white"
        >
          Continue to Create Website
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}