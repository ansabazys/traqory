import { analyticsApi } from "@/lib/api/client";


export async function getOverview(
  websiteId: string,
) {
  return analyticsApi.get(
    `/analytics/${websiteId}/overview`,
  );
}

export async function getEvents(
  websiteId: string,
) {
  return analyticsApi.get(
    `/analytics/${websiteId}/events`,
  );
}