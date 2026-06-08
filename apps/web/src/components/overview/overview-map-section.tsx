"use client";

import * as React from "react";
import { motion } from "motion/react";
import { DottedMap } from "@/components/ui/dotted-map";
import { OverviewMapOverlay } from "@/components/overview/overview-map-overlay";

type OverviewMarker = {
  lat: number;
  lng: number;
  size?: number;
  overlay: {
    countryCode: string;
    label: string;
  };
};

type OverlayProps = {
  marker: OverviewMarker;
  x: number;
  y: number;
  r: number;
  index: number;
};

export function OverviewMapSection({
  markers,
  topCountries,
}: {
  markers: OverviewMarker[];
  topCountries: { code: string; color: string; requests: string; rate: string }[];
}) {
  const id = React.useId();

  return (
    <>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.45 }}
        className="mb-4"
      >
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
          <span className="text-white">Global Traffic - System Overview</span>
          <br />
          [Last 24 hours]
        </h2>
      </motion.div>

      <motion.div
        className="relative w-full flex-1 items-center min-h-[500px] mb-8"
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <OverviewMapOverlay
          totalRequests="115,843,647"
          totalRate="415,534"
          topCountries={topCountries}
          regionCount={19}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center -ml-32"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <DottedMap
            width={300}
            height={150}
            mapSamples={12000}
            markers={markers}
            dotRadius={0.4}
            className="opacity-80"
            renderMarkerOverlay={(props: OverlayProps) => {
              const { marker, x, y, r, index } = props;
              const { countryCode, label } = marker.overlay;
              const href = `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
              const clipId = `${id}-clip-${index}`.replace(/:/g, "-");
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
      </motion.div>
    </>
  );
}
