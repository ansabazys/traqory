'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import Globe from '../ui/globe';
import { OverviewMapOverlay } from '@/components/overview/overview-map-overlay';
import { DottedMap } from '../ui/dotted-map';

type OverviewMarker = {
  lat: number;
  lng: number;
  size?: number;
  overlay: {
    countryCode: string;
    label: string;
  };
};

type TopCountry = {
  code: string;
  name: string;
  requests: string;
  rate: string;
  color: string;
};

type OverlayProps = {
  marker: OverviewMarker;
  x: number;
  y: number;
  r: number;
  index: number;
};

type Props = {
  dotMarkers: OverviewMarker[];
  globeMarkers: OverviewMarker[];
  topCountries: TopCountry[];
  visitors: number;
  activeVisitors: number;
  regionCount: number;
};

export function OverviewMapSection({
  dotMarkers,
  globeMarkers,
  topCountries,
  visitors,
  activeVisitors,
  regionCount,
}: Props) {
  const globeCobeMarkers = React.useMemo(
    () =>
      globeMarkers
        .sort((a, b) => (b.size ?? 0) - (a.size ?? 0))
        .slice(0, 5)
        .map((marker, index) => ({
          id: `country-${index}`,
          label: marker.overlay.countryCode,
          location: [marker.lat, marker.lng] as [number, number],
          size: marker.size,
        })),
    [globeMarkers],
  );

  const id = React.useId();

  return (
    <>
      <motion.div
        className="relative mb-8 min-h-[500px] w-full flex-1 items-center"
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
          },
          show: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-4 "
        >
          <h2 className="hidden md:block text-[10px] absolute top-0 w-full font-mono uppercase tracking-widest text-[#888888]">
            <span className="text-white">Global Traffic - System Overview</span>
            <br />
            [Last 24 hours]
          </h2>
        </motion.div>

        <div className="hidden md:block">
          <OverviewMapOverlay
            totalRequests={visitors.toLocaleString()}
            totalRate={activeVisitors.toLocaleString()}
            topCountries={topCountries}
            regionCount={regionCount}
          />
        </div>

        <motion.div
          className="absolute hidden inset-0 -ml-32 md:flex items-center justify-center"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.12,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <DottedMap
            width={300}
            height={150}
            mapSamples={12000}
            markers={dotMarkers}
            dotRadius={0.4}
            className="opacity-80"
            renderMarkerOverlay={(props: OverlayProps) => {
              const { marker, x, y, r, index } = props;

              const { countryCode, label } = marker.overlay;

              const href = `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;

              const clipId = `${id}-clip-${index}`.replace(/:/g, '-');

              const imgR = r * 0.75;

              const fontSize = r * 0.9;

              const pillH = r * 1.5;

              const pillW = label.length * (fontSize * 0.6) + r * 1.5;

              const pillX = x + r + 2;

              const pillY = y - pillH / 2;

              return (
                <g>
                  <clipPath id={clipId}>
                    <circle cx={x} cy={y} r={imgR} />
                  </clipPath>

                  <image
                    xlinkHref={href}
                    x={x - imgR}
                    y={y - imgR}
                    width={imgR * 2}
                    height={imgR * 2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${clipId})`}
                  />

                  <rect
                    x={pillX}
                    y={pillY}
                    width={pillW}
                    height={pillH}
                    rx={pillH / 2}
                    fill="rgba(0,0,0,0.6)"
                  />

                  <text x={pillX} y={y + fontSize * 0.35} fontSize={fontSize} fill="white">
                    {label}
                  </text>
                </g>
              );
            }}
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          <h2 className="text-[10px] md:hidden  w-full font-mono uppercase tracking-widest text-[#888888]">
            <span className="text-white">Global Traffic - System Overview</span>
            <br />
            [Last 24 hours]
          </h2>

          <div className="md:hidden">
            <Globe markers={globeCobeMarkers} />
          </div>

          <OverviewMapOverlay
            totalRequests={visitors.toLocaleString()}
            totalRate={activeVisitors.toLocaleString()}
            topCountries={topCountries}
            regionCount={regionCount}
          />
        </div>
      </motion.div>
    </>
  );
}
