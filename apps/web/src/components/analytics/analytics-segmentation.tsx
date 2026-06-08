"use client";

import { motion } from "motion/react";

const DEVICES = [
  { name: "Desktop", percent: 65, color: "#fff" },
  { name: "Mobile", percent: 28, color: "#888" },
  { name: "Tablet", percent: 7, color: "#444" },
];

const BROWSERS = [
  { name: "Chrome", percent: 55 },
  { name: "Safari", percent: 30 },
  { name: "Firefox", percent: 10 },
  { name: "Edge", percent: 5 },
];

const COUNTRIES = [
  { name: "United States", percent: 45 },
  { name: "United Kingdom", percent: 15 },
  { name: "Germany", percent: 12 },
  { name: "Canada", percent: 8 },
  { name: "Other", percent: 20 },
];

// Helper to draw a segment of a donut chart
function createDonutSegment(percent: number, offset: number) {
  const circumference = 2 * Math.PI * 15.91549430918954;
  const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
  const strokeDashoffset = -((offset / 100) * circumference) + 25; // 25 to start at top
  return { strokeDasharray, strokeDashoffset };
}

export function AnalyticsSegmentation() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Device (Donut Chart) */}
      <motion.div
        className="border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="mb-6 text-[13px] font-semibold tracking-wide text-white">Device</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <motion.circle
                cx="18"
                cy="18"
                r="15.91549430918954"
                fill="transparent"
                stroke="#111"
                strokeWidth="3"
              />
              {DEVICES.map((d, i) => {
                const offset = DEVICES.slice(0, i).reduce((acc, curr) => acc + curr.percent, 0);
                const { strokeDasharray, strokeDashoffset } = createDonutSegment(d.percent, offset);
                return (
                  <motion.circle
                    key={d.name}
                    cx="18"
                    cy="18"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke={d.color}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-3">
            {DEVICES.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-xs text-[#888888]">{d.name}</span>
                </div>
                <span className="text-sm font-medium text-white">{d.percent}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Browser (Horizontal Bars) */}
      <motion.div
        className="flex flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="mb-4 text-[13px] font-semibold tracking-wide text-white">Browser</h3>
        <div className="flex flex-col gap-4">
          {BROWSERS.map((b, i) => (
            <div key={b.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">{b.name}</span>
                <span className="text-white font-medium">{b.percent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#111111]  overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${b.percent}%` }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                  className="h-full bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Country (Horizontal Bars) */}
      <motion.div
        className="flex flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
        whileHover={{ y: -3, borderColor: "#2a2a2a" }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="mb-4 text-[13px] font-semibold tracking-wide text-white">Country</h3>
        <div className="flex flex-col gap-4">
          {COUNTRIES.map((c, i) => (
            <div key={c.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">{c.name}</span>
                <span className="text-white font-medium">{c.percent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#111111]  overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.percent}%` }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                  className="h-full bg-white opacity-60"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
