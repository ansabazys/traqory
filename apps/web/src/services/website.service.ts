import { websiteApi } from "@/lib/api/client";

import type {
  Website,
  ApiKey,
} from "@/components/websites/types";

export type CreateApiKeyResponse = ApiKey & {
  key: string;
};

export type GetWebsitesFilters = {
  search?: string;
  status?: Website["status"];
  environment?: Website["environment"];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export async function getWebsites(
  filters?: GetWebsitesFilters,
) {
  let path = "/v1/websites";

  if (filters) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null
        ) {
          params.append(
            key,
            String(value),
          );
        }
      },
    );

    const query = params.toString();

    if (query) {
      path += `?${query}`;
    }
  }

  return websiteApi.get<Website[]>(
    path,
  );
}

export async function getWebsite(
  websiteId: string,
) {
  return websiteApi.get<Website>(
    `/v1/websites/${websiteId}`,
  );
}

export async function createWebsite(
  data: {
    name: string;
    domain: string;
    description?: string;
    environment?: Website["environment"];
    timezone?: string;
  },
) {
  return websiteApi.post<Website>(
    "/v1/websites",
    data,
  );
}

export async function updateWebsite(
  websiteId: string,
  data: Partial<{
    name: string;
    domain: string;
    description: string | null;
    environment: Website["environment"];
    timezone: string;
    status: Website["status"];
  }>,
) {
  return websiteApi.patch<Website>(
    `/v1/websites/${websiteId}`,
    data,
  );
}

export async function deleteWebsite(
  websiteId: string,
) {
  return websiteApi.delete<void>(
    `/v1/websites/${websiteId}`,
  );
}

export async function getApiKeys(
  websiteId: string,
) {
  return websiteApi.get<ApiKey[]>(
    `/v1/websites/${websiteId}/api-keys`,
  );
}

export async function createApiKey(
  websiteId: string,
  data?: {
    name?: string;
    expiresInDays?:
      | "never"
      | 30
      | 90
      | 180;
  },
) {
  return websiteApi.post<CreateApiKeyResponse>(
    `/v1/websites/${websiteId}/api-keys`,
    data ?? {},
  );
}

export async function rotateApiKey(
  apiKeyId: string,
) {
  return websiteApi.post<CreateApiKeyResponse>(
    `/v1/websites/api-keys/${apiKeyId}/rotate`,
    {},
  );
}

export async function revokeApiKey(
  apiKeyId: string,
) {
  return websiteApi.delete<void>(
    `/v1/websites/api-keys/${apiKeyId}`,
  );
}