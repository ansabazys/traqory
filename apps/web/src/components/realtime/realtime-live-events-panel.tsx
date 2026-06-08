"use client";

import { Filter, Pause } from "lucide-react";
import { motion } from "motion/react";

type RealtimeRow = {
  time: string;
  geo: string;
  path: string;
  event: string;
  eventColor: string;
  highlight?: boolean;
};

export function RealtimeLiveEventsPanel({ rows }: { rows: RealtimeRow[] }) {
  return (
    <motion.div
      className="flex max-h-[800px] h-full flex-1 flex-col border border-[#1a1a1a] bg-[#0a0a0a]"
      whileHover={{ borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
        <div className="flex items-center gap-3">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          />
          <h2 className="text-[13px] font-semibold tracking-wide">Live Events</h2>
        </div>
        <div className="flex items-center gap-5 text-xs font-mono text-[#888888]">
          <button className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Pause className="h-3.5 w-3.5" />
            Pause
          </button>
          <button className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 border-b border-[#1a1a1a] px-5 py-4 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#666666]">
        <div className="col-span-2">Time</div>
        <div className="col-span-1">Geo</div>
        <div className="col-span-7 pl-6">Path</div>
        <div className="col-span-2 text-right">Event</div>
      </div>

      <div className="flex flex-col overflow-y-auto">
        {rows.map((row, index) => (
          <motion.div
            key={`${row.time}-${row.path}`}
            className={`grid grid-cols-12 px-5 py-3 text-xs font-mono cursor-pointer transition-colors hover:bg-[#111] ${row.highlight ? "bg-[#111111]" : ""}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + index * 0.035, duration: 0.28 }}
            whileHover={{ backgroundColor: "#111111" }}
          >
            <div className="col-span-2 text-[#888888]">{row.time}</div>
            <div className="col-span-1 font-semibold text-[#ededed]">{row.geo}</div>
            <div className="col-span-7 truncate pl-6 pr-4 text-[#ededed]">{row.path}</div>
            <div className={`col-span-2 text-right font-medium ${row.eventColor}`}>{row.event}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
