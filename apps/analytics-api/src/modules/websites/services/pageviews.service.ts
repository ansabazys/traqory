import { getWebsitePageViews } from "@traqory/database";

export async function getPageViewsService(
  websiteId: string,
) {
  return getWebsitePageViews(
    websiteId,
  );
}