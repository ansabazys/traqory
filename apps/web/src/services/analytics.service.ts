import { analyticsApi } from "@/lib/api/client";

export interface OverviewResponse {
  totalSessions: number;
  activeSessions: number;
  avgDuration: string;

  totalEvents: number;
  pageViews: number;
  clicks: number;
  customEvents: number;

  bounceRate: number;
  engagedUsers: number;

  totalPageViews: number;

  countries: {
    code: string;
    requests: number;
    rate: number;
  }[];

  mapMarkers: {
    lat: number;
    lng: number;
    countryCode: string;
    label: string;
  }[];
}

export async function getOverview(
  websiteId: string,
) {
  return analyticsApi.get<OverviewResponse>(
    `/v1/analytics/${websiteId}/overview`,
  );
}