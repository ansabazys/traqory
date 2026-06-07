export interface SDKConfig {
  apiKey: string;
  endpoint: string;

  autoPageview?: boolean;
  debug?: boolean;

  batchSize?: number;
  flushInterval?: number;
}

export interface EventPayload {
  apiKey: string;

  event: string;

  visitorId: string;
  sessionId: string;

  userId?: string;

  timestamp: number;

  url: string;
  path: string;
  referrer: string;
  title: string;

  properties?: Record<string, unknown>;

  language?: string;
  timezone?: string;
  screen?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}
