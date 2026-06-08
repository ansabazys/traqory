"use client";

import { motion } from "motion/react";
import { Zap, FileText, AlertCircle } from "lucide-react";

interface EventsSidebarProps {
  eventTypes: Array<{ eventName: string; count: number }>;
  activeEventName: string;
  onSelectEventName: (value: string) => void;
  topPaths: Array<{ path: string; count: number }>;
  recentErrors: Array<{ id: string; message: string; timestamp: string }>;
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function EventsSidebar({
  eventTypes,
  activeEventName,
  onSelectEventName,
  topPaths,
  recentErrors,
}: EventsSidebarProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 16 },
        show: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="flex w-full flex-shrink-0 flex-col gap-4 lg:w-[320px]"
    >
      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Event Types</span>
          <Zap className="h-3.5 w-3.5" />
        </div>

        <div className="flex flex-col gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => onSelectEventName("all")}
            className={`flex items-center justify-between px-2 py-1 text-left transition-colors ${activeEventName === "all" ? "bg-[#111111] text-white" : "text-[#ededed] hover:bg-[#111111]"}`}
          >
            <span>all</span>
            <span className="font-semibold text-[#666]">
              {eventTypes.reduce((sum, item) => sum + item.count, 0)}
            </span>
          </button>
          {eventTypes.map((eventType) => (
            <button
              key={eventType.eventName}
              type="button"
              onClick={() => onSelectEventName(eventType.eventName)}
              className={`flex items-center justify-between px-2 py-1 text-left transition-colors ${activeEventName === eventType.eventName ? "bg-[#111111] text-white" : "text-[#ededed] hover:bg-[#111111]"}`}
            >
              <span>{eventType.eventName}</span>
              <span className="font-semibold text-[#666]">{eventType.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Top Paths</span>
          <FileText className="h-3.5 w-3.5" />
        </div>

        <div className="flex flex-col gap-3.5 text-xs font-mono">
          {topPaths.map((pathItem) => (
            <div key={pathItem.path} className="flex items-center justify-between text-[#ededed]">
              <span className="truncate pr-4">{pathItem.path}</span>
              <span className="font-semibold text-[#666]">{pathItem.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
          <span>Recent Errors</span>
          <AlertCircle className="h-3.5 w-3.5" />
        </div>

        <div className="mt-1 flex flex-col gap-4 text-xs font-mono">
          {recentErrors.length === 0 ? (
            <span className="text-[#666]">No errors in current result set</span>
          ) : (
            recentErrors.map((error) => (
              <div key={error.id} className="flex flex-col gap-1 text-[#ededed]">
                <span className="truncate font-medium text-[#ef4444]">{error.message}</span>
                <span className="text-[10px] text-[#555]">{formatTime(error.timestamp)}</span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
