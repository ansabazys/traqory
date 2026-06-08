export type WebsiteStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED';

export type WebsiteEnvironment = 'production' | 'staging' | 'development';

export interface Website {
  id: string;
  name: string;
  domain: string;

  apiKey?: string;
  apiKeyId?: string;

  description?: string | null;
  favicon?: string | null;

  status: WebsiteStatus;
  environment: WebsiteEnvironment;
  timezone: string;

  events24h: number;
  activeUsers: number;

  lastActive?: string | null;

  sparkline: number[];

  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;

  name: string;
  prefix: string;

  createdBy: string;

  expiresAt?: string | null;
  lastUsedAt?: string | null;

  rotatedAt?: string | null;
  revokedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface WebsiteStats {
  label: string;
  value: string | number;
  detail: string;
}
