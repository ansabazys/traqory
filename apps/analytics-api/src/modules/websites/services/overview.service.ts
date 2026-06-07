import { getWebsiteOverview } from "@traqory/database";

export async function getOverviewService(
  websiteId: string,
) {
  return getWebsiteOverview(
    websiteId,
  );
}