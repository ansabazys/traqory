import { track } from "./track";

export function pageview(
  properties: Record<string, unknown> = {}
): void {
  track("page_view", properties);
}