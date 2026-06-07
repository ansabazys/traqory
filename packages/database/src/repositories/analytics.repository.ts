import { count, eq, sql } from "drizzle-orm";

import { db } from "../client.js";
import { event } from "../schema/analytics/event.schema.js";

export async function getWebsiteOverview(
  websiteId: string,
) {
  const [eventsResult] = await db
    .select({
      count: count(),
    })
    .from(event)
    .where(eq(event.websiteId, websiteId));

  const [pageViewsResult] = await db
    .select({
      count: count(),
    })
    .from(event)
    .where(
      sql`${event.websiteId} = ${websiteId}
          AND ${event.event} = 'page_view'`,
    );

  const [visitorsResult] = await db
    .select({
      count: sql<number>`count(distinct ${event.ip})`,
    })
    .from(event)
    .where(eq(event.websiteId, websiteId));

  return {
    pageViews: Number(pageViewsResult?.count ?? 0),
    uniqueVisitors: Number(visitorsResult?.count ?? 0),
    events: Number(eventsResult?.count ?? 0),
  };
}