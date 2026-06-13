'use client';

import {
  Activity,
  Zap,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Realtime Analytics',
    description:
      'Monitor traffic, active visitors, and events as they happen.',
  },
  {
    icon: Zap,
    title: 'Event Tracking',
    description:
      'Capture every interaction with a lightweight tracking SDK.',
  },
  {
    icon: Globe,
    title: 'Global Insights',
    description:
      'Understand traffic distribution across countries and regions.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          Platform Capabilities
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Everything you need to
          <br />
          understand user behavior.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              group
              border
              border-[#1a1a1a]
              bg-[#050505]
              p-6
              transition-colors
              hover:border-[#2a2a2a]
            "
          >
            <feature.icon className="mb-6 h-5 w-5 text-[#86efac]" />

            <h3 className="mb-3 text-lg font-semibold text-white">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed text-[#888888]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}