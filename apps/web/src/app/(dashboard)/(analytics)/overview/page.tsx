'use client';

import { motion } from 'motion/react';

import { OverviewMapSection } from '@/components/overview/overview-map-section';
import { OverviewSummaryGrid } from '@/components/overview/overview-summary-grid';

import { useWebsiteContext } from '@/contexts/website-context';
import { useOverview } from '@/hooks/analytics/use-overview';
import { Loader } from 'lucide-react';

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
  const { selectedWebsiteId } = useWebsiteContext();

  const { data: overview, isLoading } = useOverview(selectedWebsiteId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#666666]">
          <Loader className="h-4 w-4 animate-spin" />
          Loading analytics...
        </div>
      </div>
    );
  }

  if (!overview) {
    return null;
  }

  const countryMap = new Map<
    string,
    {
      lat: number;
      lng: number;
      count: number;
    }
  >();

  overview.worldMap
    ?.filter(
      (location: WorldMapLocation) => location.latitude !== null && location.longitude !== null,
    )
    .forEach((location: WorldMapLocation) => {
      const existing = countryMap.get(location.country);

      if (existing) {
        existing.count += location.count;
      } else {
        countryMap.set(location.country, {
          lat: location.latitude!,
          lng: location.longitude!,
          count: location.count,
        });
      }
    });

  const mapGlobeMarkers = Array.from(countryMap.entries()).map(([country, data]) => ({
    lat: data.lat,
    lng: data.lng,

    size: Math.min(0.12, 0.03 + data.count * 0.002),

    overlay: {
      countryCode: getCountryCode(country),
      label: getCountryCode(country),
    },
  }));

  const mapDotMarkers =
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
      name: country.name,
      code: getCountryCode(country.name),

      requests: country.count.toLocaleString(),

      rate: '',

      color: countryColors[index % countryColors.length],
    })) ?? [];

  return (
    <motion.div
      className="flex w-full md:h-full flex-col gap-5 md:pb-0 pb-10"
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
        globeMarkers={mapGlobeMarkers}
        dotMarkers={mapDotMarkers}
        topCountries={topCountries}
        visitors={overview.visitors}
        activeVisitors={overview.activeVisitors}
        regionCount={overview.topRegions?.length ?? 0}
      />

      <OverviewSummaryGrid overview={overview} />
    </motion.div>
  );
}
