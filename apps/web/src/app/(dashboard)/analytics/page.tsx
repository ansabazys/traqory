"use client";

import { motion } from "motion/react";
import { AnalyticsKpiCard } from "@/components/analytics/analytics-kpi-card";
import { AnalyticsMainChart } from "@/components/analytics/analytics-main-chart";
import { AnalyticsInsightsGrid } from "@/components/analytics/analytics-insights-grid";
import { AnalyticsSegmentation } from "@/components/analytics/analytics-segmentation";
import { AnalyticsRetentionHeatmap } from "@/components/analytics/analytics-retention-heatmap";
import { AnalyticsInsightsPanel } from "@/components/analytics/analytics-insights-panel";

// Dummy data for the KPI sparklines
const eventsData = [
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 22 },
  { value: 45 },
  { value: 65 },
];
const usersData = [
  { value: 5 },
  { value: 8 },
  { value: 12 },
  { value: 10 },
  { value: 15 },
  { value: 22 },
  { value: 25 },
];
const sessionData = [
  { value: 120 },
  { value: 130 },
  { value: 140 },
  { value: 135 },
  { value: 150 },
  { value: 165 },
  { value: 175 },
];
const retentionData = [
  { value: 100 },
  { value: 90 },
  { value: 85 },
  { value: 82 },
  { value: 75 },
  { value: 78 },
  { value: 72 },
];

const pageVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const sideReveal = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AnalyticsPage() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="flex flex-col gap-4 w-full h-full pb-20 text-white uppercase bg-[#0a0a0a] min-h-screen"
    >
      {/* 1. KPI Cards Row */}
      <motion.div
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnalyticsKpiCard
          index={0}
          title="Total Events"
          value="245.8K"
          change={12.4}
          data={eventsData}
        />
        <AnalyticsKpiCard
          index={1}
          title="Active Users"
          value="12.4K"
          change={8.2}
          data={usersData}
        />
        <AnalyticsKpiCard
          index={2}
          title="Avg Session Duration"
          value="2m 45s"
          change={-1.5}
          data={sessionData}
          titleClassName="normal-case"
        />
        <AnalyticsKpiCard
          index={3}
          title="Retention Rate"
          value="78.2%"
          change={4.5}
          data={retentionData}
        />
      </motion.div>

      {/* 2. Main Chart (Hero Section) */}
      <motion.div variants={revealUp}>
        <AnalyticsMainChart />
      </motion.div>

      {/* 3. Insights Grid */}
      <motion.div variants={revealUp}>
        <AnalyticsInsightsGrid />
      </motion.div>

      {/* 4. Segmentation Section */}
      <motion.div variants={revealUp}>
        <AnalyticsSegmentation />
      </motion.div>

      {/* 5. Bottom Row: Heatmap + Insights Panel */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-4" variants={revealUp}>
        <motion.div className="lg:col-span-2" variants={revealUp}>
          <AnalyticsRetentionHeatmap />
        </motion.div>
        <motion.div className="lg:col-span-1" variants={sideReveal}>
          <AnalyticsInsightsPanel />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
