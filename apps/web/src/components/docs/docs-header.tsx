'use client';

import Link from 'next/link';
import {Search } from 'lucide-react';

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50  backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl  items-center justify-between px-6">
        <Link
          href="/docs"
          className="font-semibold text-lg text-white"
        >
          traqory docs
         
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="
              hidden
              md:flex
              h-9
              items-center
              gap-2
              border
              border-[#1a1a1a]
              bg-[#050505]
              px-3
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-[#888]
            "
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>

          <Link
            href="https://github.com/ansabazys/traqory"
            target="_blank"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-[#1a1a1a]
              bg-[#050505]
              text-[#888]
              hover:text-white
            "
          >
         <img src="/github.svg" className='w-5 h-10'/>
          </Link>

          <Link
            href="/overview"
            className="
              border
              border-[#14532d]
              bg-[#052e16]
              px-4
              py-2
              font-mono
              text-xs
              uppercase
              tracking-widest
              text-[#86efac]
            "
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}