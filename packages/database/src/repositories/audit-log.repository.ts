import { db } from "../client.js";
import { auditLog } from "../schema/analytics/audit-log.schema.js";

export async function createAuditLog(data: typeof auditLog.$inferInsert) {
  const [record] = await db.insert(auditLog).values(data).returning();
  return record;
}
