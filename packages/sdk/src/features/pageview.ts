import { track } from "./track";

export function pageview(
  properties: Record<string, unknown> = {}
): void {
  track("$pageview", properties);
}