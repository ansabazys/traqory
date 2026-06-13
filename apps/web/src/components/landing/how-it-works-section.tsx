'use client';

const steps = [
  {
    number: '01',
    title: 'Install SDK',
    description:
      'Add the Traqory SDK to your application in minutes.',
    code: 'npm install @traqory/sdk',
  },
  {
    number: '02',
    title: 'Track Events',
    description:
      'Capture user actions and custom events with a simple API.',
    code: "track('signup')",
  },
  {
    number: '03',
    title: 'View Insights',
    description:
      'Analyze traffic, events, and user behavior in realtime.',
    code: 'app.traqory.com',
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          How It Works
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Start tracking in minutes.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#888888] md:text-base">
          Integrate Traqory, send events, and start understanding
          user behavior with realtime analytics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="
              border
              border-[#1a1a1a]
              bg-[#050505]
              p-6
              transition-colors
              hover:border-[#2a2a2a]
            "
          >
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
              {step.number}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-white">
              {step.title}
            </h3>

            <p className="mb-6 text-sm leading-relaxed text-[#888888]">
              {step.description}
            </p>

            <div
              className="
                border
                border-[#1a1a1a]
                bg-[#0a0a0a]
                px-4
                py-3
                font-mono
                text-xs
                text-[#86efac]
              "
            >
              {step.code}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}