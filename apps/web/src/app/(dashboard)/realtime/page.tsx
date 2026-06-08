"use client";

import { motion } from "motion/react";
import { RealtimeLiveEventsPanel } from "@/components/realtime/realtime-live-events-panel";
import { RealtimeSidePanels } from "@/components/realtime/realtime-side-panels";
import { RealtimeStatsGrid } from "@/components/realtime/realtime-stats-grid";

const topStats = [
  { label: "Users", value: "1,245", delta: "+12%", tone: "text-emerald-500", trend: "up" as const },
  {
    label: "Events/Sec",
    value: "415",
    delta: "+5%",
    tone: "text-emerald-500",
    trend: "up" as const,
  },
  { label: "Sessions", value: "892", delta: "-2%", tone: "text-red-500", trend: "down" as const },
];

const liveRows = [
  {
    time: "14:32:45",
    geo: "US",
    path: "/pricing",
    event: "page_view",
    eventColor: "text-[#ededed]",
  },
  {
    time: "14:32:44",
    geo: "DE",
    path: "/docs/api-reference",
    event: "click",
    eventColor: "text-[#888888]",
  },
  {
    time: "14:32:42",
    geo: "IN",
    path: "/dashboard/settings",
    event: "page_view",
    eventColor: "text-[#ededed]",
  },
  { time: "14:32:40", geo: "UK", path: "/signup", event: "signup", eventColor: "text-emerald-500" },
  {
    time: "14:32:38",
    geo: "US",
    path: "/blog/new-features",
    event: "page_view",
    eventColor: "text-[#ededed]",
  },
  { time: "14:32:35", geo: "CA", path: "/pricing", event: "click", eventColor: "text-[#888888]" },
  {
    time: "14:32:31",
    geo: "FR",
    path: "/",
    event: "page_view",
    eventColor: "text-[#ededed]",
    highlight: true,
  },
  { time: "14:32:28", geo: "JP", path: "/docs", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:25", geo: "AU", path: "/about", event: "click", eventColor: "text-[#888888]" },
  {
    time: "14:32:20",
    geo: "US",
    path: "/pricing",
    event: "page_view",
    eventColor: "text-[#ededed]",
  },
  { time: "14:32:15", geo: "BR", path: "/login", event: "click", eventColor: "text-[#888888]" },
];

const topRegions = [
  { geo: "US", count: "320", width: "40%" },
  { geo: "IN", count: "210", width: "30%" },
  { geo: "DE", count: "145", width: "20%" },
  { geo: "UK", count: "89", width: "12%" },
];

export default function RealtimePage() {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full h-full text-white uppercase bg-[#0a0a0a] min-h-screen"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <RealtimeStatsGrid stats={topStats} />

      <motion.div
        className="flex flex-1 min-h-[600px] flex-col gap-4 pb-10 lg:flex-row"
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.45 }}
      >
        <RealtimeLiveEventsPanel rows={liveRows} />
        <RealtimeSidePanels regions={topRegions} />
      </motion.div>
    </motion.div>
  );
}
