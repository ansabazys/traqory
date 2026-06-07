export interface EventJob {
  websiteId: string;
  event: string;
  path: string;
  url: string;
  timestamp: number;
  ip: string;
  userAgent: string;
  receivedAt: string;
}
