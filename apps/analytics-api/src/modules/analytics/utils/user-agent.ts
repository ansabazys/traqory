import { UAParser } from "ua-parser-js";

import type { BrowserDto, DeviceDto } from "../dto/analytics.dto.js";

type CountMap = Map<string, number>;

function percentage(count: number, total: number): number {
  if (total === 0) {
    return 0;
  }

  return Number(((count / total) * 100).toFixed(2));
}

function increment(map: CountMap, key: string) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function toSortedEntries(map: CountMap): [string, number][] {
  return Array.from(map.entries()).sort((left, right) => right[1] - left[1]);
}

export function summarizeDevices(userAgents: string[]): DeviceDto[] {
  const counts: CountMap = new Map();

  for (const userAgent of userAgents) {
    const parsed = UAParser(userAgent);
    const deviceType = parsed.device.type;
    const label = deviceType
      ? `${deviceType.charAt(0).toUpperCase()}${deviceType.slice(1)}`
      : "Desktop";

    increment(counts, label);
  }

  return toSortedEntries(counts).map(([device, count]) => ({
    device,
    count,
    percentage: percentage(count, userAgents.length),
  }));
}

export function summarizeBrowsers(userAgents: string[]): BrowserDto[] {
  const counts: CountMap = new Map();

  for (const userAgent of userAgents) {
    const parsed = UAParser(userAgent);
    increment(counts, parsed.browser.name ?? "Unknown");
  }

  return toSortedEntries(counts).map(([browser, count]) => ({
    browser,
    count,
    percentage: percentage(count, userAgents.length),
  }));
}
