import { websiteApi } from '@/lib/api/client';
import { Website } from '@/types/website';

export type ApiKey = {
  id: string;
  key: string;
  websiteId: string;
  createdAt: string;
  lastUsedAt: string | null;
  isActive: boolean;
};

export async function getWebsites() {
  return websiteApi.get<Website[]>('/v1/websites');
}

export async function getWebsite(websiteId: string) {
  return websiteApi.get<Website>(`/v1/websites/${websiteId}`);
}

export async function createWebsite(data: { name: string; domain: string }) {
  return websiteApi.post<Website>('/v1/websites', data);
}

export async function deleteWebsite(websiteId: string) {
  return websiteApi.delete<void>(`/v1/websites/${websiteId}`);
}

export async function createApiKey(websiteId: string) {
  return websiteApi.post<ApiKey>(`/v1/websites/${websiteId}/api-keys`, {});
}

export async function rotateApiKey(apiKeyId: string) {
  return websiteApi.post<ApiKey>(`/api-keys/${apiKeyId}/rotate`, {});
}

export async function getApiKeys(websiteId: string) {
  return websiteApi.get<ApiKey[]>(`/v1/websites/${websiteId}/api-keys`);
}
