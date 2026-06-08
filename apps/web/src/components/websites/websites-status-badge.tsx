"use client";

import { type WebsiteStatus } from "@/components/websites/types";

export function WebsitesStatusBadge({
  status,
}: {
  status: WebsiteStatus | string;
}) {
  const configMap = {
    ACTIVE: {
      label: "active",
      dot: "bg-[#22c55e]",
      text: "text-[#d1d5db]",
    },
    INACTIVE: {
      label: "inactive",
      dot: "bg-[#6b7280]",
      text: "text-[#9ca3af]",
    },
    PENDING: {
      label: "no data",
      dot: "bg-[#ef4444]",
      text: "text-[#d1d5db]",
    },
    ARCHIVED: {
      label: "archived",
      dot: "bg-[#f59e0b]",
      text: "text-[#d1d5db]",
    },
  } as const;

  const config =
    configMap[
      status as keyof typeof configMap
    ] ?? configMap.PENDING;

  return (
    <div
      className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ${config.text}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
      />
      <span>{config.label}</span>
    </div>
  );
}