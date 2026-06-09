'use client';

import { motion } from 'motion/react';

import { OverviewStatPanel } from '@/components/overview/overview-stat-panel';

type Props = {
  overview: {
    visitors: number;
    activeVisitors: number;
    sessions: number;
    activeSessions: number;
    pageViews: number;
    clicks: number;
    customEvents: number;
    events: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
};

function formatDuration(
  seconds: number,
) {
  if (!seconds) {
    return '0s';
  }

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

export function OverviewSummaryGrid({
  overview,
}: Props) {
  const revealUp = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
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
        mainValue={overview.sessions.toLocaleString()}
        rows={[
          {
            label:
              'Active Sessions',
            value:
              overview.activeSessions.toLocaleString(),
          },
          {
            label:
              'Avg Duration',
            value: formatDuration(
              overview.avgSessionDuration,
            ),
          },
        ]}
      />

      <OverviewStatPanel
        title="Events Tracked"
        mainValue={overview.events.toLocaleString()}
        rows={[
          {
            label:
              'Page Views',
            value:
              overview.pageViews.toLocaleString(),
            color: '#3b82f6',
          },
          {
            label: 'Clicks',
            value:
              overview.clicks.toLocaleString(),
            color: '#eab308',
          },
          {
            label:
              'Custom Events',
            value:
              overview.customEvents.toLocaleString(),
            color: '#ef4444',
          },
        ]}
      />

      <motion.div
        variants={revealUp}
        transition={{
          duration: 0.45,
        }}
        className="flex flex-col gap-5 "
      >
        <motion.div
          className="flex-1 border border-zinc-900 bg-[#0a0a0a] p-5 pb-4"
          whileHover={{
            y: -4,
            borderColor:
              'rgb(39 39 42)',
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#888888]">
            User Engagement
          </h3>

          <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase">
            <div className="flex items-center justify-between">
              <span className="text-[#888888]">
                Bounce Rate
              </span>

              <span className="text-white">
                {overview.bounceRate}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#888888]">
                Visitors
              </span>

              <span className="text-white">
                {overview.visitors.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#888888]">
                Active Visitors
              </span>

              <span className="text-white">
                {overview.activeVisitors.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 border border-zinc-900 border-t bg-[#0a0a0a] p-5 pb-4"
          whileHover={{
            y: -4,
            borderColor:
              'rgb(39 39 42)',
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#888888]">
            Page Views
          </h3>

          <p className="mt-1 text-3xl font-semibold tracking-wider text-white">
            {overview.pageViews.toLocaleString()}
          </p>

          <p className="mt-2 font-mono text-[10px] text-[#888888]">
            Total pages viewed
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}