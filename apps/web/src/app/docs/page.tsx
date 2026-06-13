import Link from 'next/link';

const sections = [
  {
    title: 'Getting Started',
    description: 'Create a website, generate API keys, and install the SDK.',
    href: '/docs/getting-started',
  },
  {
    title: 'SDK',
    description: 'Learn how to use the Traqory SDK.',
    href: '/docs/sdk',
  },
  {
    title: 'API Reference',
    description: 'Endpoints, payloads, and schemas.',
    href: '/docs/api-reference',
  },
  {
    title: 'Troubleshooting',
    description: 'Common setup and integration issues.',
    href: '/docs/troubleshooting',
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-16">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          Documentation
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-white">Traqory Docs</h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#888888]">
          Everything you need to integrate Traqory and start tracking events.
        </p>
      </div>

      <div className="mb-16 border border-[#1a1a1a] bg-[#050505] p-6">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Quick Start</h2>

        <div className="space-y-2 font-mono text-sm text-[#888888]">
          <div>01. Create Website</div>
          <div>02. Copy API Key</div>
          <div>03. Install SDK</div>
          <div>04. Create Provider</div>
          <div>05. Track Events</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="border border-[#1a1a1a] bg-[#050505] p-6 transition-colors hover:border-[#2a2a2a] hover:bg-[#080808]"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">{section.title}</h3>

            <p className="text-sm text-[#888888]">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
