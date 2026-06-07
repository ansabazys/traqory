import {
  index,
  pgTable,
  text,
  doublePrecision,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { website } from "./website.schema.js";

export const event = pgTable(
  "event",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    websiteId: uuid("website_id")
      .notNull()
      .references(() => website.id, {
        onDelete: "cascade",
      }),

    event: text("event").notNull(),

    path: text("path").notNull(),

    url: text("url").notNull(),

    ip: text("ip").notNull(),

    userAgent: text("user_agent").notNull(),

    country: text("country"),

    region: text("region"),

    city: text("city"),

    latitude: doublePrecision("latitude"),

    longitude: doublePrecision("longitude"),

    timestamp: timestamp("timestamp")
      .notNull(),

    receivedAt: timestamp("received_at")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("event_website_id_idx").on(
      table.websiteId,
    ),
    index("event_timestamp_idx").on(
      table.timestamp,
    ),
    index("event_website_timestamp_idx").on(
      table.websiteId,
      table.timestamp,
    ),
    index("event_country_idx").on(
      table.country,
    ),
  ],
);

export type Event =
  typeof event.$inferSelect;

export type NewEvent =
  typeof event.$inferInsert;
