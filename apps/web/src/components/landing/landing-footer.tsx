'use client';

import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="mb-3 text-lg font-semibold text-white">
              traqory
            </h3>

            <p className="text-sm leading-relaxed text-[#888888]">
              Realtime analytics infrastructure built
              for modern applications.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/pricing"
              className="text-[#888888] transition-colors hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/docs"
              className="text-[#888888] transition-colors hover:text-white"
            >
              Docs
            </Link>

            <Link
              href="/changelog"
              className="text-[#888888] transition-colors hover:text-white"
            >
              Changelog
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="text-[#888888] transition-colors hover:text-white"
            >
              Github
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center w-full pt-6">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-widest text-[#666666]">
            <span>
              © 2026 Traqory. All rights reserved.
            </span>

          
          </div>
        </div>
      </div>
    </footer>
  );
}