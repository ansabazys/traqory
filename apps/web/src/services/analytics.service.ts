import { analyticsApi } from "@/lib/api/client";

export interface OverviewResponse {
  visitors: number;
  activeVisitors: number;

  sessions: number;
  activeSessions: number;

  pageViews: number;

  clicks: number;

  customEvents: number;

  events: number;

  bounceRate: number;

  avgSessionDuration: number;

  topCountries: {
    name: string;
    count: number;
  }[];

  topRegions: {
    name: string;
    count: number;
  }[];

  worldMap: {
    country: string;
    region: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    count: number;
  }[];
}
export async function getOverview(
  websiteId: string,
) {
  return analyticsApi.get<OverviewResponse>(
    `/v1/analytics/${websiteId}/overview`,
  );
}