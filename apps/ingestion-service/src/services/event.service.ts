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
  },
) {
  return {
    ...event,
    websiteId: metadata.websiteId,
    ip: metadata.ip,
    userAgent: metadata.userAgent,
    receivedAt: new Date(),
  };
}