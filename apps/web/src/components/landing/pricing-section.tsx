'use client';

import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for personal projects and getting started.',
    features: ['10,000 events / month', '1 website', 'Realtime analytics', 'Basic event tracking'],
    cta: 'Get Started',
    href: '/register',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Built for growing products and production workloads.',
    features: [
      '1M events / month',
      'Unlimited websites',
      'Advanced analytics',
      'Custom events',
      'Priority support',
    ],
    cta: 'Start Free',
    href: '/register',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with advanced requirements.',
    features: ['Unlimited events', 'Dedicated infrastructure', 'Custom SLA', 'Dedicated support'],
    cta: 'Contact Sales',
    href: '/contact',
  },
];

export function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          Pricing
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Simple pricing for every stage.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#888888] md:text-base">
          Start free, scale as you grow, and only pay for what you use.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={[
              'flex flex-col border bg-[#050505] p-6',
              plan.highlighted ? 'border-[#14532d]' : 'border-[#1a1a1a]',
            ].join(' ')}
          >
            <div className="mb-6">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
                {plan.name}
              </div>

              <div className="text-4xl font-semibold text-white">
                {plan.price}
                {plan.price !== 'Custom' && (
                  <span className="text-sm font-normal text-[#888888]">/mo</span>
                )}
              </div>

              <p className="mt-3 text-sm text-[#888888]">{plan.description}</p>
            </div>

            <div className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="font-mono text-xs uppercase tracking-widest text-white"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>

            <Link
              href={plan.href}
              className={
                plan.highlighted
                  ? `
                    flex
                    h-10
                    items-center
                    justify-center
                    border
                    border-[#14532d]
                    bg-[#052e16]
                    text-xs
                    font-mono
                    uppercase
                    tracking-widest
                    text-[#86efac]
                    transition-colors
                    hover:bg-[#064e23]
                  `
                  : `
                    flex
                    h-10
                    items-center
                    justify-center
                    border
                    border-[#1a1a1a]
                    bg-[#0a0a0a]
                    text-xs
                    font-mono
                    uppercase
                    tracking-widest
                    text-white
                    transition-colors
                    hover:bg-[#111111]
                  `
              }
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
