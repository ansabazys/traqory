export interface EventRecord {
  websiteId: string;
  event: string;
  path: string;
  url: string;
  ip: string;
  userAgent: string;
  timestamp: number;
  receivedAt: string;
}