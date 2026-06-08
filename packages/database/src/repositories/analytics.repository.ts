import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm';

import { db } from '../client.js';
import { event } from '../schema/analytics/event.schema.js';

export type AnalyticsDateRange = {
  from: Date;
  to: Date;
};

export type TimelineInterval = 'hour' | 'day' | 'week' | 'month';

type WebsiteOverviewRow = {
  websiteId: string;
  events24h: string | number | null;
  activeUsers: string | number | null;
  lastActive: Date | string | null;
};

export type EventListFilters = {
  page: number;
  limit: number;
  event?: string;
  path?: string;
  search?: string;
  status?: string;
};

export type CountRow = {
  count: number;
};

export type SessionMetricsRow = {
  total: number;
  active: number;
  avgDuration: number;
  bounceRate: number;
};

export type TopDimensionRow = {
  value: string;
  count: number;
};

export type TopPageRow = {
  path: string;
  views: number;
};

export type TimelineRow = {
  date: string;
  events: number;
  visitors: number;
  sessions: number;
};

export type TopEventComparisonRow = {
  event: string;
  count: number;
  previousCount: number;
};

export type ExplorerEventRow = {
  id: string;
  timestamp: Date;
  event: string;
  path: string;
  ip: string;
  userAgent: string;
  country: string | null;
  region: string | null;
};

export type RealtimeEventRow = {
  timestamp: Date;
  country: string | null;
  path: string;
  event: string;
};

export type WorldMapRow = {
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  count: number;
};

export type RetentionCellRow = {
  cohortWeek: string;
  weekNumber: number;
  users: number;
};

type RawCountRow = { count: string | number | null };
type RawSessionMetricsRow = {
  total: string | number | null;
  active: string | number | null;
  avgDuration: string | number | null;
  bounceRate: string | number | null;
};
type RawTopDimensionRow = { value: string | null; count: string | number | null };
type RawTimelineRow = {
  date: Date | string;
  events: string | number | null;
  visitors: string | number | null;
  sessions: string | number | null;
};
type RawTopEventComparisonRow = {
  event: string | null;
  count: string | number | null;
  previousCount: string | number | null;
};
type RawWorldMapRow = {
  country: string | null;
  region: string | null;
  city: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  count: string | number | null;
};
type RawRetentionCellRow = {
  cohortWeek: Date | string;
  weekNumber: string | number | null;
  users: string | number | null;
};

const REALTIME_WINDOW_MINUTES = 5;

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

function toDateString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toRows<TRow>(rows: unknown): TRow[] {
  return Array.from(rows as Iterable<TRow>);
}

function scopedDateWhere(websiteId: string, range: AnalyticsDateRange) {
  return and(
    eq(event.websiteId, websiteId),
    gte(event.timestamp, new Date(range.from.toISOString())),
    lte(event.timestamp, new Date(range.to.toISOString())),
  );
}

function previousRange(range: AnalyticsDateRange): AnalyticsDateRange {
  const duration = range.to.getTime() - range.from.getTime();

  return {
    from: new Date(range.from.getTime() - duration),
    to: new Date(range.from.getTime()),
  };
}

async function getSingleCount(query: Promise<RawCountRow[]>): Promise<number> {
  const [row] = await query;
  return toNumber(row?.count);
}

export async function getTotalEvents(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<number> {
  return getSingleCount(
    db.select({ count: count() }).from(event).where(scopedDateWhere(websiteId, range)),
  );
}

export async function getPageViewCount(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<number> {
  return getSingleCount(
    db
      .select({ count: count() })
      .from(event)
      .where(and(scopedDateWhere(websiteId, range), eq(event.event, 'page_view'))),
  );
}

export async function getVisitorCount(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<number> {
  const result = await db
    .select({
      count: sql<number>`count(distinct ${event.ip})`,
    })
    .from(event)
    .where(
      and(
        eq(event.websiteId, websiteId),
        gte(event.timestamp, new Date(range.from.toISOString())),
        lte(event.timestamp, new Date(range.to.toISOString())),
      ),
    );

  return Number(result[0]?.count ?? 0);
}

export async function getActiveVisitorCount(websiteId: string): Promise<number> {
  const rows = await db.execute(
    sql<RawCountRow>`select count(distinct "visitor_id") as "count"
      from "event"
      where "website_id" = ${websiteId}
        and "timestamp" >= now() - interval '${sql.raw(`${REALTIME_WINDOW_MINUTES} minutes`)}'`,
  );

  return toNumber(toRows<RawCountRow>(rows)[0]?.count);
}

export async function getSessionMetrics(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<SessionMetricsRow> {
  const rows = await db.execute(
    sql<RawSessionMetricsRow>`
      with sessions as (
        select
          "visitor_id",
          "session_id",

          min("timestamp") as started_at,
          max("timestamp") as ended_at,

          count(*) as event_count,

          count(*) filter (
            where "event" = 'page_view'
          ) as page_views

        from "event"
        where "website_id" = ${websiteId}
          and "timestamp" >= ${range.from.toISOString()}
          and "timestamp" <= ${range.to.toISOString()}
          and "session_id" is not null

        group by
          "visitor_id",
          "session_id"
      )

      select
        count(*) as "total",

        count(*) filter (
          where ended_at >=
            now() -
            interval '${sql.raw(`${REALTIME_WINDOW_MINUTES} minutes`)}'
        ) as "active",

        coalesce(
          avg(
            extract(
              epoch from (
                ended_at - started_at
              )
            )
          ),
          0
        ) as "avgDuration",

        coalesce(
          (
            count(*) filter (
              where page_views <= 1
            )::float
            /
            nullif(count(*), 0)
          ) * 100,
          0
        ) as "bounceRate"

      from sessions
    `,
  );

  const row = toRows<RawSessionMetricsRow>(rows)[0];

  return {
    total: toNumber(row?.total),
    active: toNumber(row?.active),
    avgDuration: toNumber(row?.avgDuration),
    bounceRate: toNumber(row?.bounceRate),
  };
}

export async function getTopCountries(
  websiteId: string,
  range: AnalyticsDateRange,
  limit = 10,
): Promise<TopDimensionRow[]> {
  const rows = await db.execute(
    sql<RawTopDimensionRow>`select coalesce("country", 'Unknown') as "value", count(*) as "count"
      from "event"
      where "website_id" = ${websiteId}
        and "timestamp" >= ${range.from.toISOString()}
        and "timestamp" <= ${range.to.toISOString()}
      group by coalesce("country", 'Unknown')
      order by count(*) desc
      limit ${limit}`,
  );

  return toRows<RawTopDimensionRow>(rows).map((row) => ({
    value: row.value ?? 'Unknown',
    count: toNumber(row.count),
  }));
}

export async function getTopRegions(
  websiteId: string,
  range: AnalyticsDateRange,
  limit = 10,
): Promise<TopDimensionRow[]> {
  const rows = await db.execute(
    sql<RawTopDimensionRow>`select coalesce("region", 'Unknown') as "value", count(*) as "count"
      from "event"
      where "website_id" = ${websiteId}
        and "timestamp" >= ${range.from.toISOString()}
        and "timestamp" <= ${range.to.toISOString()}
      group by coalesce("region", 'Unknown')
      order by count(*) desc
      limit ${limit}`,
  );

  return toRows<RawTopDimensionRow>(rows).map((row) => ({
    value: row.value ?? 'Unknown',
    count: toNumber(row.count),
  }));
}

export async function getWorldMap(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<WorldMapRow[]> {
  const rows = await db.execute(
    sql<RawWorldMapRow>`select
        coalesce("country", 'Unknown') as "country",
        coalesce("region", 'Unknown') as "region",
        coalesce("city", 'Unknown') as "city",
        "latitude",
        "longitude",
        count(*) as "count"
      from "event"
      where "website_id" = ${websiteId}
        and "timestamp" >= ${range.from.toISOString()}
        and "timestamp" <= ${range.to.toISOString()}
      group by coalesce("country", 'Unknown'), coalesce("region", 'Unknown'), coalesce("city", 'Unknown'), "latitude", "longitude"
      order by count(*) desc
      limit 100`,
  );

  return toRows<RawWorldMapRow>(rows).map((row) => ({
    country: row.country ?? 'Unknown',
    region: row.region ?? 'Unknown',
    city: row.city ?? 'Unknown',
    latitude: row.latitude === null ? null : toNumber(row.latitude),
    longitude: row.longitude === null ? null : toNumber(row.longitude),
    count: toNumber(row.count),
  }));
}

export async function getTimeline(
  websiteId: string,
  range: AnalyticsDateRange,
  interval: TimelineInterval,
): Promise<TimelineRow[]> {
  const bucket =
    interval === 'hour'
      ? 'hour'
      : interval === 'week'
        ? 'week'
        : interval === 'month'
          ? 'month'
          : 'day';

  const bucketSql = sql.raw(`'${bucket}'`);

  const rows = await db.execute(
    sql<RawTimelineRow>`
    select
      date_trunc(${bucketSql}, "timestamp") as "date",

      count(*) as "events",

      count(distinct "visitor_id") as "visitors",

      count(distinct "session_id") as "sessions"

    from "event"

    where "website_id" = ${websiteId}
      and "timestamp" >= ${range.from.toISOString()}
      and "timestamp" <= ${range.to.toISOString()}

    group by date_trunc(${bucketSql}, "timestamp")

    order by "date" asc
  `,
  );

  return toRows<RawTimelineRow>(rows).map((row) => ({
    date: toDateString(row.date),
    events: toNumber(row.events),
    visitors: toNumber(row.visitors),
    sessions: toNumber(row.sessions),
  }));
}

export async function getTopEventsWithComparison(
  websiteId: string,
  range: AnalyticsDateRange,
  limit = 10,
): Promise<TopEventComparisonRow[]> {
  const previous = previousRange(range);

  const rows = await db.execute(
    sql<RawTopEventComparisonRow>`
      with current_events as (
        select
          "event",
          count(*) as "count"
        from "event"
        where "website_id" = ${websiteId}
          and "timestamp" >= ${range.from.toISOString()}
          and "timestamp" <= ${range.to.toISOString()}
        group by "event"
      ),
      previous_events as (
        select
          "event",
          count(*) as "count"
        from "event"
        where "website_id" = ${websiteId}
          and "timestamp" >= ${previous.from.toISOString()}
          and "timestamp" < ${previous.to.toISOString()}
        group by "event"
      )
      select
        current_events."event",
        current_events."count",
        coalesce(previous_events."count", 0) as "previousCount"
      from current_events
      left join previous_events
        on previous_events."event" = current_events."event"
      order by current_events."count" desc
      limit ${limit}
    `,
  );

  return toRows<RawTopEventComparisonRow>(rows).map((row) => ({
    event: row.event ?? 'unknown',
    count: toNumber(row.count),
    previousCount: toNumber(row.previousCount),
  }));
}

export async function getTopPages(
  websiteId: string,
  range: AnalyticsDateRange,
  limit = 10,
): Promise<TopPageRow[]> {
  const rows = await db
    .select({
      path: event.path,
      views: sql<number>`count(*)`,
    })
    .from(event)
    .where(and(scopedDateWhere(websiteId, range), eq(event.event, 'page_view')))
    .groupBy(event.path)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);

  return rows.map((row) => ({
    path: row.path,
    views: toNumber(row.views),
  }));
}

export async function getEventTypes(
  websiteId: string,
  range: AnalyticsDateRange,
  limit = 50,
): Promise<TopDimensionRow[]> {
  const rows = await db
    .select({
      value: event.event,
      count: sql<number>`count(*)`,
    })
    .from(event)
    .where(scopedDateWhere(websiteId, range))
    .groupBy(event.event)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);

  return rows.map((row) => ({
    value: row.value,
    count: toNumber(row.count),
  }));
}

export async function getActivePages(websiteId: string, limit = 20): Promise<TopPageRow[]> {
  const rows = await db.execute(
    sql<RawTopDimensionRow>`select "path" as "value", count(*) as "count"
      from "event"
      where "website_id" = ${websiteId}
        and "event" = 'page_view'
        and "timestamp" >= now() - interval '${sql.raw(`${REALTIME_WINDOW_MINUTES} minutes`)}'
      group by "path"
      order by count(*) desc
      limit ${limit}`,
  );

  return toRows<RawTopDimensionRow>(rows).map((row) => ({
    path: row.value ?? '/',
    views: toNumber(row.count),
  }));
}

export async function getRealtimeEvents(
  websiteId: string,
  limit = 50,
): Promise<RealtimeEventRow[]> {
  const rows = await db
    .select({
      timestamp: event.timestamp,
      country: event.country,
      path: event.path,
      event: event.event,
    })
    .from(event)
    .where(
      and(
        eq(event.websiteId, websiteId),
        gte(
          event.timestamp,
          sql<Date>`now() - interval '${sql.raw(`${REALTIME_WINDOW_MINUTES} minutes`)}'`,
        ),
      ),
    )
    .orderBy(desc(event.timestamp))
    .limit(limit);

  return rows;
}

export async function listEvents(
  websiteId: string,
  range: AnalyticsDateRange,
  filters: EventListFilters,
): Promise<{ items: ExplorerEventRow[]; total: number }> {
  const conditions = [scopedDateWhere(websiteId, range)];

  if (filters.event) {
    conditions.push(eq(event.event, filters.event));
  }

  if (filters.path) {
    conditions.push(eq(event.path, filters.path));
  }

  if (filters.search) {
    conditions.push(
      sql`(${event.event} ilike ${`%${filters.search}%`} or ${event.path} ilike ${`%${filters.search}%`} or ${event.url} ilike ${`%${filters.search}%`})`,
    );
  }

  const where = and(...conditions);
  const offset = (filters.page - 1) * filters.limit;

  const [items, total] = await Promise.all([
    db
      .select({
        id: event.id,
        timestamp: event.timestamp,
        event: event.event,
        path: event.path,
        ip: event.ip,
        userAgent: event.userAgent,
        country: event.country,
        region: event.region,
      })
      .from(event)
      .where(where)
      .orderBy(desc(event.timestamp))
      .limit(filters.limit)
      .offset(offset),
    getSingleCount(db.select({ count: count() }).from(event).where(where)),
  ]);

  return { items, total };
}

export async function getUserAgents(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<string[]> {
  const rows = await db
    .select({ userAgent: event.userAgent })
    .from(event)
    .where(scopedDateWhere(websiteId, range));

  return rows.map((row) => row.userAgent);
}

export async function getRetentionCells(
  websiteId: string,
  range: AnalyticsDateRange,
): Promise<RetentionCellRow[]> {
  const rows = await db.execute(
    sql<RawRetentionCellRow>`
    with first_seen as (
      select
        "visitor_id",

        date_trunc(
          'week',
          min("timestamp")
        ) as cohort_week

      from "event"

      where "website_id" = ${websiteId}
        and "visitor_id" is not null

      group by "visitor_id"
    ),

    weekly_activity as (
      select distinct
        event."visitor_id",

        first_seen.cohort_week,

        date_trunc(
          'week',
          event."timestamp"
        ) as activity_week

      from "event"

      join first_seen
        on first_seen."visitor_id" =
           event."visitor_id"

      where event."website_id" = ${websiteId}
        and event."timestamp" >= ${range.from.toISOString()}
        and event."timestamp" <= ${range.to.toISOString()}
    )

    select
      cohort_week as "cohortWeek",

      floor(
        extract(
          epoch from (
            activity_week -
            cohort_week
          )
        ) / 604800
      )::int as "weekNumber",

      count(
        distinct "visitor_id"
      ) as "users"

    from weekly_activity

    where activity_week >= cohort_week

      and floor(
        extract(
          epoch from (
            activity_week -
            cohort_week
          )
        ) / 604800
      )::int between 0 and 12

    group by
      cohort_week,
      "weekNumber"

    order by
      cohort_week asc,
      "weekNumber" asc
  `,
  );

  return toRows<RawRetentionCellRow>(rows).map((row) => ({
    cohortWeek: toDateString(row.cohortWeek),
    weekNumber: toNumber(row.weekNumber),
    users: toNumber(row.users),
  }));
}

// TODO:
// Move high-cardinality analytics queries
// to ClickHouse when event volume grows.

export async function getWebsiteOverview(websiteId: string) {
  const range = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  };

  const [pageViews, uniqueVisitors, events] = await Promise.all([
    getPageViewCount(websiteId, range),
    getVisitorCount(websiteId, range),
    getTotalEvents(websiteId, range),
  ]);

  return {
    pageViews,
    uniqueVisitors,
    events,
  };
}

export async function getWebsitePageViews(websiteId: string) {
  const range = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  };
  const pages = await getTopPages(websiteId, range, 100);

  return {
    total: pages.reduce((sum, page) => sum + page.views, 0),
    pages,
  };
}

export async function getWebsitesOverviewStats(
  websiteIds: string[],
): Promise<Record<string, { events24h: number; activeUsers: number; lastActive: string | null }>> {
  if (websiteIds.length === 0) return {};

  const idsStr = websiteIds.map((id) => `'${id}'`).join(', ');
  const rows = await db.execute(
    sql`
      SELECT 
        website_id as "websiteId",
        count(*) filter (where timestamp >= now() - interval '24 hours') as "events24h",
        count(distinct visitor_id) filter (where timestamp >= now() - interval '30 minutes') as "activeUsers",
        max(timestamp) as "lastActive"
      FROM event
      WHERE website_id IN (${sql.raw(idsStr)})
      GROUP BY website_id
    `,
  );

  const result: Record<
    string,
    { events24h: number; activeUsers: number; lastActive: string | null }
  > = {};
  const websiteRows = rows as unknown as WebsiteOverviewRow[];

  for (const row of websiteRows) {
    result[row.websiteId] = {
      events24h: Number(row.events24h ?? 0),
      activeUsers: Number(row.activeUsers ?? 0),
      lastActive: row.lastActive ? new Date(row.lastActive).toISOString() : null,
    };
  }

  for (const id of websiteIds) {
    if (!result[id]) {
      result[id] = {
        events24h: 0,
        activeUsers: 0,
        lastActive: null,
      };
    }
  }

  return result;
}

export async function getWebsitesSparklines(
  websiteIds: string[],
): Promise<Record<string, number[]>> {
  if (websiteIds.length === 0) {
    return {};
  }

  const ids = sql.join(
    websiteIds.map((id) => sql`${id}`),
    sql`, `,
  );

  const rows = await db.execute(sql`
  SELECT
    "website_id" as "websiteId",
    date_trunc('hour', "timestamp") as "hourBucket",
    count(*) as "count"
  FROM "event"
  WHERE "website_id" IN (${ids})
    AND "timestamp" >= now() - interval '24 hours'
  GROUP BY
    "website_id",
    date_trunc('hour', "timestamp")
  ORDER BY "hourBucket" ASC
`);

  console.log('SPARKLINE ROWS', JSON.stringify(rows, null, 2));

  const result: Record<string, number[]> = {};

  for (const id of websiteIds) {
    result[id] = Array(24).fill(0);
  }

  const nowMs = Date.now();

  for (const row of rows as unknown as Record<string, unknown>[]) {
    const websiteId =
      (row.websiteId as string | undefined) ?? (row.website_id as string | undefined);

    const hourBucket =
      (row.hourBucket as string | Date | undefined) ??
      (row.hour_bucket as string | Date | undefined);

    const count = Number((row.count as string | number | undefined) ?? 0);

    if (!websiteId || !hourBucket) {
      continue;
    }

    const bucketTime = new Date(hourBucket).getTime();

    // const hoursAgo = Math.floor((nowMs - bucketTime) / (1000 * 60 * 60));

    // const index = 23 - hoursAgo;

    const daysAgo = Math.floor((nowMs - bucketTime) / (1000 * 60 * 60 * 24));

    const index = 6 - daysAgo;

    if (index >= 0 && index < 24) {
      const sparkline = result[websiteId];

      if (sparkline) {
        sparkline[index] = count;
      }
    }
  }

  console.log('SPARKLINE RESULT', JSON.stringify(result, null, 2));

  return result;
}
