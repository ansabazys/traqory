"use client";

import { Globe, Plus } from "lucide-react";
import { motion, type Variants } from "motion/react";

export function WebsitesEmptyState({
  onAddWebsite,
  variants,
}: {
  onAddWebsite: () => void;
  variants: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="flex min-h-[420px] flex-col items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a] px-6 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[#1a1a1a] bg-[#111111]">
        <Globe className="h-5 w-5 text-[#888888]" />
      </div>
      <h2 className="mb-2 text-sm font-semibold text-white">No websites added</h2>
      <p className="mb-6 max-w-md text-xs font-mono uppercase tracking-widest text-[#666666]">
        Create your first tracked website to start collecting events and monitoring health.
      </p>
      <button
        type="button"
        onClick={onAddWebsite}
        className="flex h-10 items-center gap-2 border border-[#1a1a1a] bg-[#0a0a0a] px-4 text-xs font-mono uppercase tracking-widest text-white transition-colors hover:border-[#2a2a2a] hover:bg-[#111111]"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Add your first website</span>
      </button>
    </motion.div>
  );
}
