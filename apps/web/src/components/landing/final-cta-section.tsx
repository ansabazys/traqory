'use client';

import Link from 'next/link';

export function FinalCTASection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
      <div className="border border-[#1a1a1a] bg-[#050505] px-8 py-20 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#888888]">
          Get Started
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Ready to start tracking?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#888888] md:text-base">
          Collect events, monitor traffic, and understand
          user behavior with realtime analytics.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/register"
            className="
              flex
              h-10
              items-center
              justify-center
              border
              border-[#14532d]
              bg-[#052e16]
              px-6
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-[#86efac]
              transition-colors
              hover:bg-[#064e23]
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}