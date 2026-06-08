"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AnalyticsInsightsPanel() {
  return (
    <motion.div
      className="relative flex h-full flex-col overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] p-5"
      whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24" />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-4 w-4 text-[#888888]" />
        <h3 className="text-[13px] font-semibold tracking-wide text-white">AI Insights</h3>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded-full bg-green-500/10 text-green-500">
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs text-white leading-relaxed">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-medium text-green-400"
                >
                  Events increased by 12%
                </motion.span>{" "}
                this week following the v2.0 release on Tuesday.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded-full bg-blue-500/10 text-blue-500">
              <Sparkles className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs text-white leading-relaxed">
                Unusual spike in traffic from{" "}
                <span className="font-mono text-[10px] bg-[#222] px-1 rounded mx-0.5">Germany</span>
                . Safari usage is up 8% in this segment.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded-full bg-red-500/10 text-red-500">
              <ArrowDownRight className="h-3 w-3" />
            </div>
            <div>
              <p className="text-xs text-white leading-relaxed">
                Retention dropped for <span className="font-medium">Week 4</span> cohorts. Mostly
                affecting users who started checkout but abandoned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
