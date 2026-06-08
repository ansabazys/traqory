"use client";

import { FileText, Globe, Zap } from "lucide-react";
import { motion } from "motion/react";

type RealtimeRegion = {
  geo: string;
  count: string;
  width: string;
};

export function RealtimeSidePanels({ regions }: { regions: RealtimeRegion[] }) {
  return (
    <motion.div
      className="flex w-full flex-col gap-4 lg:w-[320px]"
      variants={{
        hidden: { opacity: 0, x: 1 },
        show: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.45, delay: 0.12 }}
    >
      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Event Types</span>
          <Zap className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col gap-3.5 text-xs font-mono">
          <div className="flex items-center justify-between text-[#ededed]">
            <span>page_view</span>
            <span className="font-semibold">320/s</span>
          </div>
          <div className="flex items-center justify-between text-[#ededed]">
            <span>click</span>
            <span className="font-semibold">120/s</span>
          </div>
          <div className="flex items-center justify-between text-emerald-500">
            <span>signup</span>
            <span className="font-semibold">32/s</span>
          </div>
          <div className="flex items-center justify-between text-[#ededed]">
            <span>form_submit</span>
            <span className="font-semibold">18/s</span>
          </div>
          <div className="flex items-center justify-between text-red-500">
            <span>error</span>
            <span className="font-semibold">2/s</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Active Pages</span>
          <FileText className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col gap-3.5 text-xs font-mono">
          {[
            ["/dashboard", "213"],
            ["/pricing", "182"],
            ["/docs", "97"],
            ["/blog", "64"],
            ["/", "45"],
          ].map(([path, count]) => (
            <div key={path} className="flex items-center justify-between text-[#ededed]">
              <span className="truncate pr-4">{path}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Top Regions</span>
          <Globe className="h-3.5 w-3.5" />
        </div>
        <div className="mt-1 flex flex-col gap-4 text-xs font-mono">
          {regions.map((region, index) => (
            <div key={region.geo} className="flex items-center text-[#ededed]">
              <span className="w-8 font-semibold">{region.geo}</span>
              <div className="ml-4 mr-6 h-[2px] flex-1 bg-[#222]">
                <motion.div
                  className="h-full bg-[#ededed]"
                  initial={{ width: 0 }}
                  animate={{ width: region.width }}
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span className="w-8 text-right font-semibold">{region.count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
