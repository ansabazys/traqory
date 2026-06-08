"use client";

import { motion } from "motion/react";
import { OverviewMapSection } from "@/components/overview/overview-map-section";
import { OverviewSummaryGrid } from "@/components/overview/overview-summary-grid";

const mapMarkers = [
  { lat: 40.7128, lng: -74.006, size: 2.8, overlay: { countryCode: "us", label: "New York" } },
  {
    lat: 34.0522,
    lng: -118.2437,
    size: 2.8,
    overlay: { countryCode: "us", label: "Los Angeles" },
  },
  { lat: 51.5074, lng: -0.1278, size: 2.8, overlay: { countryCode: "gb", label: "London" } },
  {
    lat: 50.1109,
    lng: 8.6821,
    size: 2.8,
    overlay: { countryCode: "de", label: "Frankfurt" },
  },
  { lat: 48.8566, lng: 2.3522, size: 2.8, overlay: { countryCode: "fr", label: "Paris" } },
  {
    lat: 1.3521,
    lng: 103.8198,
    size: 2.8,
    overlay: { countryCode: "sg", label: "Singapore" },
  },
  { lat: 35.6762, lng: 139.6503, size: 2.8, overlay: { countryCode: "jp", label: "Tokyo" } },
  { lat: 19.076, lng: 72.8777, size: 2.8, overlay: { countryCode: "in", label: "Mumbai" } },
  {
    lat: -23.5505,
    lng: -46.6333,
    size: 2.8,
    overlay: { countryCode: "br", label: "Sao Paulo" },
  },
  { lat: -33.8688, lng: 151.2093, size: 2.8, overlay: { countryCode: "au", label: "Sydney" } },
];

const topCountries = [
  { code: "US", color: "#3b82f6", requests: "40,778,234", rate: "18.2%" },
  { code: "DE", color: "#eab308", requests: "6,211,644", rate: "4.1%" },
  { code: "GB", color: "#3b82f6", requests: "4,952,185", rate: "3.6%" },
  { code: "IN", color: "#eab308", requests: "4,357,562", rate: "3.2%" },
  { code: "BR", color: "#ef4444", requests: "3,933,116", rate: "2.9%" },
  { code: "SG", color: "#f97316", requests: "3,807,130", rate: "2.7%" },
  { code: "JP", color: "#ef4444", requests: "3,690,520", rate: "2.6%" },
];

export default function OverviewPage() {
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
      <OverviewMapSection markers={mapMarkers} topCountries={topCountries} />
      <OverviewSummaryGrid />
    </motion.div>
  );
}
