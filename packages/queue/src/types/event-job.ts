export interface EventJob {
  websiteId: string;

  event: string;

  path: string;
  url: string;

  ip: string;
  userAgent: string;

  visitorId: string;

  sessionId: string;

  userId: string | null;

  browser: string;

  browserVersion: string | null;

  os: string;

  osVersion: string | null;

  deviceType: string;

  country: string | null;
  region: string | null;
  city: string | null;

  latitude: number | null;
  longitude: number | null;

  timestamp: number;
  receivedAt: number;
}
