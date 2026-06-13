'use client';

import Link from 'next/link';

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold text-white">traqory</span>
        </Link>

        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            font-mono
            text-sm
            uppercase
            tracking-widest
            text-[#888888]
            transition-colors
            hover:text-white
          "
        >
          Home
        </Link>
      </div>
    </header>
  );
}
