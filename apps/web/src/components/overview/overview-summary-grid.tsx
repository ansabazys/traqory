"use client";

import { motion } from "motion/react";
import { OverviewStatPanel } from "@/components/overview/overview-stat-panel";

interface OverviewSummaryGridProps {
  data?: {
    totalSessions: number;
    activeSessions: number;
    avgDuration: string;

    totalEvents: number;
    pageViews: number;
    clicks: number;
    customEvents: number;

    bounceRate: number;
    engagedUsers: number;

    totalPageViews: number;
  };
}

function formatNumber(value?: number) {
  return (value ?? 0).toLocaleString();
}

export function OverviewSummaryGrid({
  data,
}: OverviewSummaryGridProps) {
  const revealUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid gap-5 border-zinc-900 md:grid-cols-3"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.12,
          },
        },
      }}
    >
      <OverviewStatPanel
        title="Total Sessions"
        mainValue={formatNumber(data?.totalSessions)}
        rows={[
          {
            label: "Active Sessions",
            value: formatNumber(data?.activeSessions),
          },
          {
            label: "Avg Duration",
            value: data?.avgDuration ?? "0s",
          },
        ]}
      />

      <OverviewStatPanel
        title="Events Tracked"
        mainValue={formatNumber(data?.totalEvents)}
        rows={[
          {
            label: "Page Views",
            value: formatNumber(data?.pageViews),
            color: "#3b82f6",
          },
          {
            label: "Clicks",
            value: formatNumber(data?.clicks),
            color: "#eab308",
          },
          {
            label: "Custom Events",
            value: formatNumber(data?.customEvents),
            color: "#ef4444",
          },
        ]}
      />

      <motion.div
        variants={revealUp}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-5"
      >
        <motion.div
          className="flex-1 border border-zinc-900 bg-[#0a0a0a] p-5 pb-4"
          whileHover={{
            y: -4,
            borderColor: "rgb(39 39 42)",
          }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="mb-4 font-mono text-[10px] tracking-widest text-[#888888] uppercase">
            User Engagement
          </h3>

          <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase">
            <div className="flex items-center justify-between">
              <span className="text-[#888888]">
                Bounce Rate
              </span>
              <span className="text-white">
                {data?.bounceRate ?? 0}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#888888]">
                Engaged Users
              </span>
              <span className="text-white">
                {formatNumber(
                  data?.engagedUsers,
                )}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 border border-zinc-900 border-t bg-[#0a0a0a] p-5 pb-4"
          whileHover={{
            y: -4,
            borderColor: "rgb(39 39 42)",
          }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="mb-2 font-mono text-[10px] tracking-widest text-[#888888] uppercase">
            Page Views
          </h3>

          <p className="mt-1 text-3xl font-semibold tracking-wider text-white">
            {formatNumber(
              data?.totalPageViews,
            )}
          </p>

          <p className="mt-2 font-mono text-[10px] text-[#888888]">
            Total pages viewed
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}