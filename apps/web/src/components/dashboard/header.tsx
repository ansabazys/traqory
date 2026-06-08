"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

export function Header({ setOpen }: { setOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/overview": "Overview",
    "/realtime": "Realtime",
    "/analytics": "Analytics",
    "/events": "Events",
    "/websites": "Websites",
    "/settings": "Settings",
  };

  const pageTitle =
    pageTitles[pathname] ??
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) ??
    "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#1a1a1a] bg-[#050505] px-4 md:px-8">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md hover:bg-[#111]">
          <Menu className="h-5 w-5 text-white" />
        </button>

        <h1 className="text-lg font-medium tracking-tight text-[#ededed]">{pageTitle}</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <div className="flex items-center  border border-[#1a1a1a] bg-[#111111] overflow-hidden">
          <button className="px-3 py-1.5 text-xs text-[#888888] hover:text-[#ededed]">
            Last 24h
          </button>

          <div className="h-4 w-px bg-[#1a1a1a]" />

          <button className="px-2 py-1.5 text-[#888888] hover:bg-[#161616] hover:text-[#ededed]">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[#1a1a1a]" />

          <button className="px-2 py-1.5 text-[#888888] hover:bg-[#161616] hover:text-[#ededed]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
