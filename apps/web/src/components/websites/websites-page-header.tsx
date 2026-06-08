'use client';

import { Plus } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

export function WebsitesPageHeader({
  onAddWebsite,
  variants,
}: {
  onAddWebsite: () => void;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants} className="flex items-center justify-between">
      <div>
        <h1 className="mb-1 text-[13px] font-semibold tracking-wide text-white uppercase">
          Websites
        </h1>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
          Manage tracked projects, health status, and setup access.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddWebsite}
        className="flex h-10 items-center gap-2 border border-[#1a1a1a] bg-[#0a0a0a] px-4 text-xs font-mono uppercase tracking-widest text-white transition-colors hover:border-[#2a2a2a] hover:bg-[#111111]"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Add Website</span>
      </button>
    </motion.div>
  );
}
