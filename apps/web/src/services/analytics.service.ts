import { analyticsApi } from '@/lib/api/client';

export function getOverview(websiteId: string) {
  return analyticsApi.get(`/v1/analytics/${websiteId}/overview`);
}

export function getRealtime(websiteId: string) {
  return analyticsApi.get(`/v1/analytics/${websiteId}/realtime`);
}

export function getDashboard(websiteId: string) {
  return analyticsApi.get(`/v1/analytics/${websiteId}/dashboard`);
}
