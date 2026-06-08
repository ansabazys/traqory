import { websiteApi } from "@/lib/api/client";

export async function getWebsites() {
  return websiteApi.get("/websites");
}

export async function getWebsite(
  websiteId: string,
) {
  return websiteApi.get(
    `/websites/${websiteId}`,
  );
}

export async function createWebsite(
  data: {
    name: string;
    domain: string;
  },
) {
  return websiteApi.post(
    "/websites",
    data,
  );
}