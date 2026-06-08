import { websiteApi } from '@/lib/api/client';
import { Website } from '@/types/website';

export async function getWebsites() {
  return websiteApi.get<Website[]>('/v1/websites');
}

export async function getWebsite(websiteId: string) {
  return websiteApi.get(`/v1/websites/${websiteId}`);
}

export async function createWebsite(data: { name: string; domain: string }) {
  return websiteApi.post('/v1/websites', data);
}

export async function deleteWebsite(websiteId: string) {
  return websiteApi.delete(`/v1/websites/${websiteId}`);
}
