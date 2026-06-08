"use client";

import { motion } from "motion/react";

export function SettingsActionButton({
  children,
  onClick,
  tone = "default",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "default" | "danger";
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ opacity: disabled ? 1 : 0.86 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 border px-3 text-[10px] font-mono uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        tone === "danger"
          ? "border-red-950 text-red-400 hover:bg-[#140808]"
          : "border-[#1a1a1a] text-[#d1d5db] hover:bg-[#111111] hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}
