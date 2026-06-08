"use client";

import { motion } from "motion/react";

export function SettingsToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1a1a1a] py-3 last:border-b-0 last:pb-0 first:pt-0">
      <div>
        <p className="text-sm text-[#e5e7eb]">{label}</p>
        <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative flex h-6 w-11 items-center border px-1 transition-colors focus:outline-none ${
          checked ? "border-[#22c55e]/50 bg-[#22c55e]/20" : "border-[#333] bg-[#1a1a1a]"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`h-4 w-4 rounded-full ${checked ? "bg-[#22c55e]" : "bg-[#555]"}`}
          style={{ marginLeft: checked ? "auto" : 0 }}
        />
      </button>
    </div>
  );
}
