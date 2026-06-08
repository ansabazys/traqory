"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", events: 1200, users: 400, sessions: 450 },
  { time: "04:00", events: 900, users: 300, sessions: 320 },
  { time: "08:00", events: 2400, users: 800, sessions: 850 },
  { time: "12:00", events: 3800, users: 1500, sessions: 1600 },
  { time: "16:00", events: 4200, users: 1800, sessions: 1900 },
  { time: "20:00", events: 2800, users: 1100, sessions: 1150 },
  { time: "24:00", events: 1500, users: 500, sessions: 550 },
];

const METRICS = [
  { id: "events", label: "Total Events", color: "#fff" },
  { id: "users", label: "Active Users", color: "#888" },
  { id: "sessions", label: "Sessions", color: "#3b82f6" },
];

export function AnalyticsMainChart() {
  const [activeMetrics, setActiveMetrics] = useState<Record<string, boolean>>({
    events: true,
    users: false,
    sessions: false,
  });

  const toggleMetric = (id: string) => {
    setActiveMetrics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <motion.div
      className="flex flex-col w-full border border-[#1a1a1a] bg-[#0a0a0a] p-5"
      whileHover={{ borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-[13px] font-semibold tracking-wide text-white">Platform Activity</h2>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#888888]">
            Events, users, and sessions over time
          </p>
        </div>

        <div className="flex items-center gap-3">
          {METRICS.map((metric) => (
            <button
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className="flex items-center gap-2 group transition-opacity hover:opacity-100 focus:outline-none"
              style={{ opacity: activeMetrics[metric.id] ? 1 : 0.5 }}
            >
              <div
                className="w-3 h-3 rounded-sm border transition-colors flex items-center justify-center"
                style={{
                  borderColor: metric.color,
                  backgroundColor: activeMetrics[metric.id] ? metric.color : "transparent",
                }}
              >
                <AnimatePresence>
                  {activeMetrics[metric.id] && (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888] group-hover:text-white transition-colors">
                {metric.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#666" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#666" }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #222",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#888", marginBottom: "4px" }}
              cursor={{ stroke: "#333", strokeWidth: 1, strokeDasharray: "4 4" }}
              animationDuration={200}
            />
            {METRICS.map(
              (metric) =>
                activeMetrics[metric.id] && (
                  <Line
                    key={metric.id}
                    type="monotone"
                    dataKey={metric.id}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0, fill: metric.color }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                ),
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
