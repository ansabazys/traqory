export interface Website {
  id: string;
  name: string;
  slug: string;
  domain: string;
  createdAt: string;

 
  events24h?: number;
  activeUsers?: number;
  lastActive?: string;
  status?: WebsiteStatus;
  sparkline?: number[];

  apiKey?: string;
}

export type WebsiteStatus =
  | "active"
  | "inactive"
  | "no_data";