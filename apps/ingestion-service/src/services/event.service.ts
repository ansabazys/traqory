export function enrichEvent(
  event: {
    event: string;
    path: string;
    url: string;
    timestamp: number;
  },
  metadata: {
    ip: string;
    userAgent: string;
    websiteId: string;
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
  },
) {
  return {
    ...event,

    websiteId: metadata.websiteId,

    ip: metadata.ip,

    userAgent: metadata.userAgent,

    browser: metadata.browser,

    browserVersion: metadata.browserVersion,

    os: metadata.os,

    osVersion: metadata.osVersion,

    deviceType: metadata.deviceType,

    country: metadata.country,
    region: metadata.region,
    city: metadata.city,

    latitude: metadata.latitude,
    longitude: metadata.longitude,

    receivedAt: Date.now(),
  };
}
