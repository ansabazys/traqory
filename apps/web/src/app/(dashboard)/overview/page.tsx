'use client';

import { motion } from 'motion/react';

import { OverviewMapSection } from '@/components/overview/overview-map-section';
import { OverviewSummaryGrid } from '@/components/overview/overview-summary-grid';

import { useWebsiteContext } from '@/contexts/website-context';
import { useOverview } from '@/hooks/analytics/use-overview';

type WorldMapLocation = {
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  count: number;
};

type TopCountry = {
  name: string;
  count: number;
};

function getCountryCode(countryName: string) {
  const codes: Record<string, string> = {
    'United States': 'US',
    'United Kingdom': 'GB',
    India: 'IN',
    Germany: 'DE',
    France: 'FR',
    Singapore: 'SG',
    Japan: 'JP',
    Brazil: 'BR',
    Australia: 'AU',
    Canada: 'CA',
  };

  return codes[countryName] ?? countryName.slice(0, 2).toUpperCase();
}

export default function OverviewPage() {
  const { selectedWebsiteId, selectedWebsite } = useWebsiteContext();

  const { data: overview, isLoading } = useOverview(selectedWebsiteId);

  if (!selectedWebsite) {
    return (
      <div className="flex h-[60vh] items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">No Website Selected</h2>

          <p className="mt-2 text-sm text-[#888888]">
            Create a website to start collecting analytics.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-sm font-mono uppercase tracking-widest text-[#888888]">
          Loading Overview...
        </div>
      </div>
    );
  }

  if (!overview) {
    return null;
  }

  const mapMarkers =
    overview.worldMap
      ?.filter(
        (location: WorldMapLocation) => location.latitude !== null && location.longitude !== null,
      )
      .map((location: WorldMapLocation) => ({
        lat: location.latitude!,
        lng: location.longitude!,

        size: Math.max(2.8, Math.min(8, location.count / 10)),

        overlay: {
          countryCode: getCountryCode(location.country).toLowerCase(),

          label: location.city || location.country || 'Unknown',
        },
      })) ?? [];

  const countryColors = ['#3b82f6', '#eab308', '#ef4444', '#f97316', '#22c55e'];

  const topCountries =
    overview.topCountries?.map((country: TopCountry, index: number) => ({
      code: getCountryCode(country.name),

      requests: country.count.toLocaleString(),

      rate: '',

      color: countryColors[index % countryColors.length],
    })) ?? [];

  return (
    <motion.div
      className="flex w-full h-full flex-col gap-5"
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
      <OverviewMapSection
        markers={mapMarkers}
        topCountries={topCountries}
        visitors={overview.visitors}
        activeVisitors={overview.activeVisitors}
        regionCount={overview.topRegions?.length ?? 0}
      />

      <OverviewSummaryGrid overview={overview} />
    </motion.div>
  );
}
