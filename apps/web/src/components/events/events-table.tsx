"use client";

import { AnimatePresence, motion } from "motion/react";
import { type EventLog } from "./event-detail-drawer";

interface EventsTableProps {
  events: EventLog[];
  onRowClick: (event: EventLog) => void;
  isLive: boolean;
  selectedEventId: string | null;
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getPropertyPreview(properties: EventLog["properties"]) {
  const entries = Object.entries(properties).slice(0, 2);

  if (entries.length === 0) {
    return "no properties";
  }

  return entries.map(([key, value]) => `${key}=${String(value)}`).join(", ");
}

export function EventsTable({ events, onRowClick, isLive, selectedEventId }: EventsTableProps) {
  return (
    <motion.div
      className="flex w-full flex-1 flex-col overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]"
      whileHover={{ borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-[180px_160px_150px_minmax(180px,1fr)_100px_240px] sticky top-0 z-10 border-b border-[#1a1a1a] bg-[#0a0a0a] px-5 py-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#666]">
        <div>Timestamp</div>
        <div>Event Name</div>
        <div>User ID</div>
        <div>Path</div>
        <div>Status</div>
        <div>Properties</div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#000]">
        {events.length === 0 ? (
          <div className="flex h-full min-h-[320px] items-center justify-center p-10 text-[#555]">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-white">No events found</span>
              <span className="text-xs font-mono">Try adjusting your filters</span>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {events.map((event, index) => {
              const isSelected = selectedEventId === event.id;

              return (
                <motion.button
                  key={event.id}
                  type="button"
                  initial={
                    isLive && index === 0
                      ? { opacity: 0, y: -14, backgroundColor: "rgba(255,255,255,0.08)" }
                      : { opacity: 0, y: 8 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundColor: isSelected ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0)",
                  }}
                  transition={{
                    duration: 0.24,
                    delay: isLive ? 0 : Math.min(index * 0.02, 0.18),
                    ease: "easeOut",
                  }}
                  onClick={() => onRowClick(event)}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="grid w-full grid-cols-[180px_160px_150px_minmax(180px,1fr)_100px_240px] border-b border-[#1a1a1a] border-opacity-50 px-5 py-2 text-left text-[11px] font-mono transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#888]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${event.status === "success" ? "bg-[#22c55e]" : "bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]"}`}
                    ></span>
                    <span className="truncate">{formatTimestamp(event.timestamp)}</span>
                  </div>
                  <div className="truncate pr-4 font-medium text-[#ededed]">{event.eventName}</div>
                  <div className="truncate pr-4 text-[#b3b3b3]">{event.userId}</div>
                  <div className="truncate pr-6 text-[#b3b3b3]">{event.path}</div>
                  <div className={event.status === "success" ? "text-[#888]" : "text-[#ef4444]"}>
                    {event.status}
                  </div>
                  <div className="truncate text-[#666]">{getPropertyPreview(event.properties)}</div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
