import { websiteApi } from "@/lib/api/client";

export interface Website {
  id: string;
  name: string;
  domain: string;
  apiKey: string;
}

export async function getWebsites() {
  return websiteApi.get<Website[]>(
    "/websites",
  );
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