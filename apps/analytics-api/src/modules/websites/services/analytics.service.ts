import {
  getWebsiteOverview,
  getWebsitePageViews,
} from "@traqory/database";

export async function getOverview(
  websiteId: string,
) {
  return getWebsiteOverview(
    websiteId,
  );
}

export async function getPageViews(
  websiteId: string,
) {
  return getWebsitePageViews(
    websiteId,
  );
}