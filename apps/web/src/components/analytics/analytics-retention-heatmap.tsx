"use client";

import { motion } from "motion/react";

const COHORTS = [
  { name: "Week 1", size: 1200, values: [100, 45, 30, 25, 20, 15, 12] },
  { name: "Week 2", size: 980, values: [100, 48, 35, 28, 22, 18, null] },
  { name: "Week 3", size: 1450, values: [100, 52, 40, 32, 25, null, null] },
  { name: "Week 4", size: 1100, values: [100, 42, 28, 20, null, null, null] },
  { name: "Week 5", size: 1320, values: [100, 55, 42, null, null, null, null] },
  { name: "Week 6", size: 1050, values: [100, 50, null, null, null, null, null] },
  { name: "Week 7", size: 1600, values: [100, null, null, null, null, null, null] },
];

export function AnalyticsRetentionHeatmap() {
  const getBackgroundColor = (value: number | null) => {
    if (value === null) return "transparent";
    // Green hue, adjust opacity based on value
    // Max brightness at 100%
    const opacity = Math.max(0.05, value / 100);
    return `rgba(34, 197, 94, ${opacity})`;
  };

  return (
    <motion.div
      className="w-full overflow-x-auto border border-[#1a1a1a] bg-[#0a0a0a] p-5"
      whileHover={{ borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6 min-w-[600px]">
        <div>
          <h3 className="text-[13px] font-semibold tracking-wide text-white">Cohort Retention</h3>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#888888]">
            User retention over weeks
          </p>
        </div>
      </div>

      <div className="min-w-[600px] flex flex-col gap-1">
        {/* Header row */}
        <div className="grid grid-cols-[100px_60px_repeat(7,1fr)] gap-1 mb-2">
          <div className="text-xs font-medium text-[#888888]">Cohort</div>
          <div className="text-xs font-medium text-[#888888] text-right pr-4">Size</div>
          {[0, 1, 2, 3, 4, 5, 6].map((week) => (
            <div key={week} className="text-xs font-medium text-[#888888] text-center">
              Week {week}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {COHORTS.map((cohort, rowIndex) => (
          <div key={cohort.name} className="grid grid-cols-[100px_60px_repeat(7,1fr)] gap-1">
            <div className="text-xs text-white flex items-center">{cohort.name}</div>
            <div className="text-xs text-[#888888] font-mono flex items-center justify-end pr-4">
              {cohort.size}
            </div>

            {cohort.values.map((val, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.2 + (rowIndex * 7 + colIndex) * 0.01,
                  ease: "easeOut",
                }}
                className={`flex items-center justify-center p-2 rounded-md text-[11px] h-8 relative group cursor-pointer ${
                  val === null ? "bg-[#111] border border-[#1a1a1a]" : ""
                }`}
                style={{ backgroundColor: getBackgroundColor(val) }}
              >
                {val !== null ? (
                  <>
                    <span className="text-white drop-shadow-md z-10 font-medium">{val}%</span>
                    {/* Tooltip */}
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#111] border border-[#222] text-white text-[10px] px-2 py-1 rounded-md pointer-events-none z-20 whitespace-nowrap shadow-xl">
                      Week {colIndex}: {val}% retained
                    </div>
                  </>
                ) : (
                  <span className="text-[#333]">-</span>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
