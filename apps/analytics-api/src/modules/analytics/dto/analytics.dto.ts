import { z } from 'zod';

export const dateRangeQuerySchema = z.object({
  from: z.string().date().optional(),
  to: z.string().date().optional(),
});

export const timelineQuerySchema = dateRangeQuerySchema.extend({
  interval: z.enum(['hour', 'day', 'week', 'month']).default('day'),
});

export const eventsQuerySchema = dateRangeQuerySchema.extend({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  event: z.string().min(1).optional(),
  path: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
});

export const websiteParamsSchema = z.object({
  websiteId: z.string().uuid(),
});

export type DateRangeQuery = z.infer<typeof dateRangeQuerySchema>;
export type TimelineQuery = z.infer<typeof timelineQuerySchema>;
export type EventsQuery = z.infer<typeof eventsQuerySchema>;
export type WebsiteParams = z.infer<typeof websiteParamsSchema>;

export type MetricBucketDto = {
  name: string;
  count: number;
  percentage?: number;
};

export type OverviewResponseDto = {
  visitors: number;
  activeVisitors: number;
  sessions: number;
  activeSessions: number;
  pageViews: number;
  clicks: number;
  customEvents: number;
  events: number;
  bounceRate: number;
  avgSessionDuration: number;
  topCountries: MetricBucketDto[];
  topRegions: MetricBucketDto[];
  worldMap: {
    country: string;
    region: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    count: number;
  }[];
};

export type RealtimeResponseDto = {
  users: number;
  eventsPerSecond: number;
  sessions: number;
  eventTypes: { event: string; count: number }[];
  activePages: { path: string; views: number }[];
  topRegions: MetricBucketDto[];
  events: {
    timestamp: string;
    country: string;
    path: string;
    event: string;
  }[];
};

export type TimelineItemDto = {
  date: string;
  events: number;
  visitors: number;
  sessions: number;
};

export type TopEventDto = {
  event: string;
  count: number;
  change: number;
};

export type DeviceDto = {
  device: string;
  count: number;
  percentage: number;
};

export type BrowserDto = {
  browser: string;
  count: number;
  percentage: number;
};

export type CountryDto = {
  country: string;
  count: number;
  percentage: number;
};

export type CohortDto = {
  cohortWeek: string;
  users: number;
  retention: Record<`week${number}`, number>;
};

export type DashboardResponseDto = {
  totalEvents: number;
  activeUsers: number;
  avgSessionDuration: number;
  retentionRate: number;
  timeline: TimelineItemDto[];
  topEvents: TopEventDto[];
  topPages: { path: string; views: number }[];
  devices: DeviceDto[];
  browsers: BrowserDto[];
  countries: CountryDto[];
  cohorts: CohortDto[];
};

export type EventsExplorerResponseDto = {
  items: {
    id: string;
    timestamp: string;
    event: string;
    path: string;
    ip: string;
    userAgent: string;
  }[];
  total: number;
  page: number;
  limit: number;
};

export type RetentionResponseDto = {
  rate: number;
  cohorts: CohortDto[];
};
