"use client";

import { motion } from "motion/react";

const TOP_EVENTS = [
  { name: "Button Clicked", count: "125,432", trend: "+12.5%" },
  { name: "Page Viewed", count: "98,211", trend: "+5.2%" },
  { name: "Form Submitted", count: "15,832", trend: "-2.4%" },
  { name: "Item Added to Cart", count: "8,941", trend: "+1.1%" },
  { name: "Checkout Started", count: "3,204", trend: "+8.9%" },
];

const TOP_PAGES = [
  { path: "/", views: "45,210" },
  { path: "/pricing", views: "12,845" },
  { path: "/docs/api", views: "9,632" },
  { path: "/dashboard", views: "8,411" },
  { path: "/blog/release-2-0", views: "5,102" },
];

export function AnalyticsInsightsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Events */}
      <motion.div
        className="overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]"
        whileHover={{ borderColor: "#2a2a2a" }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <h3 className="text-[13px] font-semibold tracking-wide text-white">Top Events</h3>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-12 border-b border-[#1a1a1a] px-5 py-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#666666]">
            <div className="col-span-8">Event</div>
            <div className="col-span-2 text-right">Count</div>
            <div className="col-span-2 text-right">Trend</div>
          </div>
          {TOP_EVENTS.map((event, i) => {
            const isPositive = event.trend.startsWith("+");
            return (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.035, duration: 0.28 }}
                whileHover={{ backgroundColor: "#111111" }}
                className="grid grid-cols-12 cursor-pointer border-b border-[#1a1a1a] border-opacity-50 px-5 py-3 text-xs font-mono transition-colors hover:bg-[#111111] last:border-0"
              >
                <div className="col-span-8 flex items-center text-[#ededed]">{event.name}</div>
                <div className="col-span-2 text-right font-semibold text-white">{event.count}</div>
                <div
                  className={`col-span-2 text-right font-medium ${isPositive ? "text-[#22c55e]" : "text-[#ef4444]"}`}
                >
                  {event.trend}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Top Pages */}
      <motion.div
        className="flex flex-col overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]"
        whileHover={{ borderColor: "#2a2a2a" }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <h3 className="text-[13px] font-semibold tracking-wide text-white">Top Pages</h3>
        </div>
        <div className="flex-1 p-5 flex flex-col gap-4">
          {TOP_PAGES.map((page, i) => (
            <motion.div
              key={page.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.035, duration: 0.28 }}
              className="group flex items-center justify-between text-xs font-mono"
            >
              <div className="text-xs font-mono text-[#888888] group-hover:text-white transition-colors">
                {page.path}
              </div>
              <div className="font-semibold text-[#ededed]">{page.views}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
