'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

const sections = [
  {
    title: 'Getting Started',
    links: [
      {
        label: 'Overview',
        href: '/docs/getting-started',
      },
      {
        label: 'Create Website',
        href: '/docs/getting-started/create-website',
      },
      {
        label: 'Install SDK',
        href: '/docs/getting-started/install-sdk',
      },
      {
        label: 'Create Provider',
        href: '/docs/getting-started/create-provider',
      },
      {
        label: 'Track Events',
        href: '/docs/getting-started/track-events',
      },
    ],
  },
  {
    title: 'Reference',
    links: [
      {
        label: 'SDK',
        href: '/docs/sdk',
      },
      {
        label: 'API Reference',
        href: '/docs/api-reference',
      },
      {
        label: 'Troubleshooting',
        href: '/docs/troubleshooting',
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Overview page should only match exactly
    if (href === '/docs/getting-started') {
      return pathname === href;
    }

    return pathname === href;
  };

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-72 shrink-0 border border-[#1a1a1a] md:block">
      <div className="h-full overflow-y-auto px-6 py-8">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#666666]">
                {section.title}
              </h3>

              <div className="space-y-1">
                {section.links.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm transition-colors',
                        active
                          ? 'bg-[#111111] text-white'
                          : 'text-[#888888] hover:bg-[#0a0a0a] hover:text-white',
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[#1a1a1a] pt-6">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm text-[#888888] transition-colors hover:bg-[#0a0a0a] hover:text-white"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </aside>
  );
}
