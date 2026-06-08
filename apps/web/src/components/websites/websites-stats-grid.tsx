"use client";

import { motion, type Variants } from "motion/react";

export function WebsitesStatsGrid({
  stats,
  variants,
}: {
  stats: { label: string; value: string | number; detail: string }[];
  variants: Variants;
}) {
  return (
    <motion.div variants={variants} className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          whileHover={{ y: -4, borderColor: "#2a2a2a" }}
          transition={{ duration: 0.2 }}
          className="flex h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
            {stat.label}
          </span>
          <span className="text-3xl font-semibold tracking-tight text-white">{stat.value}</span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
            {stat.detail}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
