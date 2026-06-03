import { relations } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { website } from "./website.schema.js";

export const apiKey = pgTable(
  "api_key",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull().unique(),
    websiteId: uuid("website_id")
      .notNull()
      .references(() => website.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastUsedAt: timestamp("last_used_at"),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (table) => [
    index("api_key_website_id_idx").on(table.websiteId),
    index("api_key_active_idx").on(table.isActive),
  ],
);

export const apiKeyRelations = relations(apiKey, ({ one }) => ({
  website: one(website, {
    fields: [apiKey.websiteId],
    references: [website.id],
  }),
}));

export type ApiKey = typeof apiKey.$inferSelect;
export type NewApiKey = typeof apiKey.$inferInsert;
