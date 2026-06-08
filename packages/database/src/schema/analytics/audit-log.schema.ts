import { index, pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    action: text("action").notNull(), // e.g. "website.created", "website.updated", "website.deleted", "api_key.created"
    resourceType: text("resource_type").notNull(), // e.g. "website", "api_key"
    resourceId: text("resource_id").notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => [
    index("audit_log_user_id_idx").on(table.userId),
    index("audit_log_resource_idx").on(table.resourceType, table.resourceId),
  ],
);

export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;
