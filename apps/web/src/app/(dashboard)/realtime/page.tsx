'use client';

import { motion } from 'motion/react';

import { RealtimeLiveEventsPanel } from '@/components/realtime/realtime-live-events-panel';
import { RealtimeSidePanels } from '@/components/realtime/realtime-side-panels';
import { RealtimeStatsGrid } from '@/components/realtime/realtime-stats-grid';

import { useRealtime } from '@/hooks/analytics/use-realtime';
import { useWebsiteContext } from '@/contexts/website-context';

function getCountryCode(countryName: string) {
  const regionNames = new Intl.DisplayNames(['en'], {
    type: 'region',
  });

  const regionCodes = [
    'US',
    'IN',
    'DE',
    'GB',
    'FR',
    'CA',
    'AU',
    'JP',
    'BR',
    'KR',
    'CN',
    'RU',
    'IT',
    'ES',
    'NL',
    'SE',
    'NO',
    'DK',
    'FI',
    'CH',
  ];

  const match = regionCodes.find((code) => regionNames.of(code) === countryName);

  return match ?? countryName;
}

export default function RealtimePage() {
  const { selectedWebsite } = useWebsiteContext();

  const snapshot = useRealtime(selectedWebsite?.id);

  console.log('SELECTED WEBSITE', selectedWebsite);

  console.log('SNAPSHOT', snapshot);

  const topStats = [
    {
      label: 'Users',
      value: String(snapshot?.users ?? 0),
      delta: '+0%',
      tone: 'text-emerald-500',
      trend: 'up' as const,
    },
    {
      label: 'Events/Sec',
      value: String(snapshot?.eventsPerSecond ?? 0),
      delta: '+0%',
      tone: 'text-emerald-500',
      trend: 'up' as const,
    },
    {
      label: 'Sessions',
      value: String(snapshot?.sessions ?? 0),
      delta: '+0%',
      tone: 'text-emerald-500',
      trend: 'up' as const,
    },
  ];

  const liveRows =
    snapshot?.liveEvents.map((event) => ({
      time: new Date(event.time).toLocaleTimeString(),

      geo: event.country,

      path: event.path,

      event: event.event,

      eventColor:
        event.event === 'signup'
          ? 'text-emerald-500'
          : event.event === 'click'
            ? 'text-[#888888]'
            : 'text-[#ededed]',
    })) ?? [];

  const eventTypes = Object.entries(snapshot?.eventTypes ?? {})
    .sort((a, b) => b[1] - a[1])
    .map(([event, count]) => ({
      event,
      count,
    }));

  const activePages = Object.entries(snapshot?.activePages ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({
      path,
      count,
    }));

  const countryEntries = Object.entries(snapshot?.countries ?? {}).sort((a, b) => b[1] - a[1]);

  const max = countryEntries[0]?.[1] ?? 1;

  const topRegions = countryEntries.map(([geo, count]) => ({
    geo: getCountryCode(geo),

    count: String(count),

    width: `${Math.max(10, (count / max) * 100)}%`,
  }));

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
          hidden: {
            opacity: 0,
            y: 18,
          },
          show: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.45,
        }}
      >
        <RealtimeLiveEventsPanel rows={liveRows} />

        <RealtimeSidePanels
          regions={topRegions}
          eventTypes={eventTypes}
          activePages={activePages}
        />
      </motion.div>
    </motion.div>
  );
}
