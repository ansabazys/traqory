export interface SDKConfig {
  apiKey: string;
  endpoint?: string;
  autoPageview?: boolean;
  debug?: boolean;
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

  properties: Record<string, unknown>;
}