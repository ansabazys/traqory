"use client";

import { motion } from "motion/react";

import { useOverview } from "@/hooks/use-overview";
import { useSelectedWebsite } from "@/hooks/use-selected-website";

import { OverviewMapSection } from "@/components/overview/overview-map-section";
import { OverviewSummaryGrid } from "@/components/overview/overview-summary-grid";

export default function OverviewPage() {
  const { website } =
    useSelectedWebsite();

  const { data, isLoading } =
    useOverview(
      website?.id,
    );

  if (!website) {
    return (
      <div className="p-6 text-zinc-400">
        Select a website
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col w-full h-screen pb-10"
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
        markers={
          data?.mapMarkers?.map(
            (marker) => ({
              lat: marker.lat,
              lng: marker.lng,
              size: 2.8,
              overlay: {
                countryCode:
                  marker.countryCode,
                label:
                  marker.label,
              },
            }),
          ) ?? []
        }
        topCountries={
          data?.countries?.map(
            (country) => ({
              code: country.code,
              color: "#3b82f6",
              requests:
                country.requests.toLocaleString(),
              rate: `${country.rate}%`,
            }),
          ) ?? []
        }
      />

      <OverviewSummaryGrid
        data={data}
      />
    </motion.div>
  );
}