import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { apiKey } from "./api-key.schema.js";

export const website = pgTable(
  "website",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    domain: text("domain").notNull().unique(),
    ownerId: text("owner_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("website_owner_id_idx").on(table.ownerId),
    index("website_owner_created_at_idx").on(table.ownerId, table.createdAt),
  ],
);

export const websiteRelations = relations(website, ({ many }) => ({
  apiKeys: many(apiKey),
}));

export type Website = typeof website.$inferSelect;
export type NewWebsite = typeof website.$inferInsert;
