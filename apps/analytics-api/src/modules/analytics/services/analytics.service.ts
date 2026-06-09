import {
  getActivePages,
  getActiveSessionCount,
  getActiveVisitorCount,
  getClickCount,
  getCustomEventCount,
  getEventTypes,
  getPageViewCount,
  getRealtimeEvents,
  getRetentionCells,
  getSessionMetrics,
  getTimeline,
  getTopCountries,
  getTopEventsWithComparison,
  getTopPages,
  getTopRegions,
  getTotalEvents,
  getUserAgents,
  getVisitorCount,
  getWorldMap,
  listEvents,
  type AnalyticsDateRange,
  type TimelineInterval,
} from '@traqory/database';

import type {
  BrowserDto,
  CountryDto,
  DashboardResponseDto,
  DateRangeQuery,
  DeviceDto,
  EventsExplorerResponseDto,
  EventsQuery,
  MetricBucketDto,
  OverviewResponseDto,
  RealtimeResponseDto,
  RetentionResponseDto,
  TimelineItemDto,
  TopEventDto,
} from '../dto/analytics.dto.js';
import { resolveDateRange } from '../utils/date-range.js';
import { resolvePagination } from '../utils/pagination.js';
import { summarizeBrowsers, summarizeDevices } from '../utils/user-agent.js';

const REALTIME_WINDOW_SECONDS = 300;
const RETENTION_WEEKS = 12;

function percent(count: number, total: number): number {
  if (total === 0) {
    return 0;
  }

  return Number(((count / total) * 100).toFixed(2));
}

function mapDimensionRows(rows: { value: string; count: number }[]): MetricBucketDto[] {
  return rows.map((row) => ({
    name: row.value,
    count: row.count,
  }));
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return Number((((current - previous) / previous) * 100).toFixed(2));
}

async function getDeviceSummaries(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<{ devices: DeviceDto[]; browsers: BrowserDto[] }> {
  const userAgents = await getUserAgents(websiteId, range);

  return {
    devices: summarizeDevices(userAgents),
    browsers: summarizeBrowsers(userAgents),
  };
}

async function getCountrySummaries(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<CountryDto[]> {
  // TODO: Replace fallback buckets with GeoIP-enriched event.country values.
  const countries = await getTopCountries(websiteId, range, 50);
  const total = countries.reduce((sum, country) => sum + country.count, 0);

  return countries.map((country) => ({
    country: country.value,
    count: country.count,
    percentage: percent(country.count, total),
  }));
}

async function getRetentionSummary(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<RetentionResponseDto> {
  const cells = await getRetentionCells(websiteId, range);
  const cohorts = new Map<string, { users: number; retention: Record<`week${number}`, number> }>();

  for (const cell of cells) {
    const cohort = cohorts.get(cell.cohortWeek) ?? {
      users: 0,
      retention: {},
    };

    if (cell.weekNumber === 0) {
      cohort.users = cell.users;
    }

    cohort.retention[`week${cell.weekNumber}`] = cell.users;
    cohorts.set(cell.cohortWeek, cohort);
  }

  const normalized = Array.from(cohorts.entries()).map(([cohortWeek, cohort]) => {
    const retention: Record<`week${number}`, number> = {};

    for (let week = 0; week <= RETENTION_WEEKS; week += 1) {
      const users = cohort.retention[`week${week}`] ?? 0;
      retention[`week${week}`] = percent(users, cohort.users);
    }

    return {
      cohortWeek,
      users: cohort.users,
      retention,
    };
  });

  const totalWeekZero = normalized.reduce((sum, cohort) => sum + cohort.users, 0);
  const totalRetained = normalized.reduce(
    (sum, cohort) => sum + Math.round(((cohort.retention.week1 ?? 0) / 100) * cohort.users),
    0,
  );

  return {
    rate: percent(totalRetained, totalWeekZero),
    cohorts: normalized,
  };
}

export async function getOverviewAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<OverviewResponseDto> {
  const range = resolveDateRange(query);

  const [
    visitors,
    activeVisitors,
    sessions,
    activeSessions,
    pageViews,
    clicks,
    customEvents,
    events,
    topCountries,
    topRegions,
    worldMap,
  ] = await Promise.all([
    getVisitorCount(websiteId, range),

    getActiveVisitorCount(websiteId),

    getSessionMetrics(websiteId, range),

    getActiveSessionCount(websiteId),

    getPageViewCount(websiteId, range),

    getClickCount(websiteId, range),

    getCustomEventCount(websiteId, range),

    getTotalEvents(websiteId, range),

    getTopCountries(websiteId, range),

    getTopRegions(websiteId, range),

    getWorldMap(websiteId, range),
  ]);

  return {
    visitors,
    activeVisitors,

    sessions: sessions.total,

    activeSessions,

    pageViews,

    clicks,

    customEvents,

    events,

    bounceRate: Number(sessions.bounceRate.toFixed(2)),

    avgSessionDuration: Number(sessions.avgDuration.toFixed(2)),

    topCountries: mapDimensionRows(topCountries),

    topRegions: mapDimensionRows(topRegions),

    worldMap,
  };
}
export async function getRealtimeAnalytics(websiteId: string): Promise<RealtimeResponseDto> {
  const realtimeRange = {
    from: new Date(Date.now() - REALTIME_WINDOW_SECONDS * 1000),
    to: new Date(),
  };
  const [users, sessions, eventTypes, activePages, topRegions, events, totalEvents] =
    await Promise.all([
      getActiveVisitorCount(websiteId),
      getSessionMetrics(websiteId, realtimeRange),
      getEventTypes(websiteId, realtimeRange),
      getActivePages(websiteId),
      getTopRegions(websiteId, realtimeRange),
      getRealtimeEvents(websiteId),
      getTotalEvents(websiteId, realtimeRange),
    ]);

  return {
    users,
    eventsPerSecond: Number((totalEvents / REALTIME_WINDOW_SECONDS).toFixed(2)),
    sessions: sessions.active,
    eventTypes: eventTypes.map((row) => ({ event: row.value, count: row.count })),
    activePages,
    topRegions: mapDimensionRows(topRegions),
    events: events.map((row) => ({
      timestamp: row.timestamp.toISOString(),
      country: row.country ?? 'Unknown',
      path: row.path,
      event: row.event,
    })),
  };
}

export async function getDashboardAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<DashboardResponseDto> {
  const range = resolveDateRange(query);
  const [
    totalEvents,
    activeUsers,
    sessions,
    timeline,
    topEvents,
    topPages,
    countrySummaries,
    retention,
    deviceSummaries,
  ] = await Promise.all([
    getTotalEvents(websiteId, range),
    getActiveVisitorCount(websiteId),
    getSessionMetrics(websiteId, range),
    getTimeline(websiteId, range, 'day'),
    getTopEventAnalytics(websiteId, range),
    getTopPages(websiteId, range),
    getCountrySummaries(websiteId, range),
    getRetentionSummary(websiteId, range),
    getDeviceSummaries(websiteId, range),
  ]);

  return {
    totalEvents,
    activeUsers,
    avgSessionDuration: Number(sessions.avgDuration.toFixed(2)),
    retentionRate: retention.rate,
    timeline,
    topEvents,
    topPages,
    devices: deviceSummaries.devices,
    browsers: deviceSummaries.browsers,
    countries: countrySummaries,
    cohorts: retention.cohorts,
  };
}

export async function getTimelineAnalytics(
  websiteId: string,
  query: DateRangeQuery,
  interval: TimelineInterval,
): Promise<TimelineItemDto[]> {
  return getTimeline(websiteId, resolveDateRange(query), interval);
}

export async function getTopEventAnalytics(
  websiteId: string,
  query: DateRangeQuery | AnalyticsDateRange,
): Promise<TopEventDto[]> {
  const rows = await getTopEventsWithComparison(websiteId, resolveDateRange(query));

  return rows.map((row) => ({
    event: row.event,
    count: row.count,
    change: calculateChange(row.count, row.previousCount),
  }));
}

export async function getTopPageAnalytics(websiteId: string, query: DateRangeQuery) {
  return getTopPages(websiteId, resolveDateRange(query));
}

export async function getDeviceAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<DeviceDto[]> {
  return getDeviceSummaries(websiteId, resolveDateRange(query)).then((summary) => summary.devices);
}

export async function getBrowserAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<BrowserDto[]> {
  return getDeviceSummaries(websiteId, resolveDateRange(query)).then((summary) => summary.browsers);
}

export async function getCountryAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<CountryDto[]> {
  return getCountrySummaries(websiteId, resolveDateRange(query));
}

export async function getRetentionAnalytics(
  websiteId: string,
  query: DateRangeQuery,
): Promise<RetentionResponseDto> {
  return getRetentionSummary(websiteId, resolveDateRange(query));
}

export async function getEventsExplorer(
  websiteId: string,
  query: EventsQuery,
): Promise<EventsExplorerResponseDto> {
  const range = resolveDateRange(query);
  const pagination = resolvePagination(query);
  const result = await listEvents(websiteId, range, {
    ...pagination,
    event: query.event,
    path: query.path,
    search: query.search,
    status: query.status,
  });

  return {
    items: result.items.map((item) => ({
      id: item.id,
      timestamp: item.timestamp.toISOString(),
      event: item.event,
      path: item.path,
      ip: item.ip,
      userAgent: item.userAgent,
    })),
    total: result.total,
    page: pagination.page,
    limit: pagination.limit,
  };
}

export async function getEventTypesAnalytics(websiteId: string, query: DateRangeQuery) {
  const rows = await getEventTypes(websiteId, resolveDateRange(query));
  return rows.map((row) => ({ event: row.value, count: row.count }));
}

export async function getActivePageAnalytics(websiteId: string) {
  return getActivePages(websiteId);
}

export async function getSessionAnalytics(websiteId: string, query: DateRangeQuery) {
  const sessions = await getSessionMetrics(websiteId, resolveDateRange(query));

  return {
    total: sessions.total,
    active: sessions.active,
    avgDuration: Number(sessions.avgDuration.toFixed(2)),
    bounceRate: Number(sessions.bounceRate.toFixed(2)),
  };
}
