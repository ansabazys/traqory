import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { website } from "./website.schema.js";

export const apiKey = pgTable(
  "api_key",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    websiteId: uuid("website_id")
      .notNull()
      .references(() => website.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    prefix: text("prefix").notNull(),
    hashedKey: text("hashed_key").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    expiresAt: timestamp("expires_at"),
    lastUsedAt: timestamp("last_used_at"),
    rotatedAt: timestamp("rotated_at"),
    revokedAt: timestamp("revoked_at"),
    createdBy: text("created_by").notNull(),
  },
  (table) => [
    index("api_key_website_id_idx").on(table.websiteId),
    index("api_key_hashed_key_idx").on(table.hashedKey),
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
