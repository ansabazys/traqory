"use client";

import { motion } from "motion/react";

type RealtimeStat = {
  label: string;
  value: string;
  delta: string;
  tone: string;
  trend: "up" | "down";
};

const statVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function RealtimeStatsGrid({ stats }: { stats: RealtimeStat[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="relative flex h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
          variants={statVariants}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, borderColor: "#2a2a2a" }}
        >
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
            {stat.label}
          </span>
          <motion.span
            className="pb-1 text-3xl font-semibold tracking-tight"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.35 }}
          >
            {stat.value}
          </motion.span>
          <div
            className={`absolute bottom-5 right-5 flex items-center text-xs font-mono ${stat.tone}`}
          >
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5"
              animate={{ y: stat.trend === "up" ? [1, -1, 1] : [-1, 1, -1] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
            >
              {stat.trend === "up" ? (
                <>
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </>
              ) : (
                <>
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  <polyline points="16 17 22 17 22 11" />
                </>
              )}
            </motion.svg>
            {stat.delta}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
