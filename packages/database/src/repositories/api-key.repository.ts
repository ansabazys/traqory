import { and, eq } from "drizzle-orm";

import { db } from "../client.js";
import { apiKey } from "../schema/analytics/api-key.schema.js";

export async function findApiKeyByKey(key: string) {
  const result = await db
    .select()
    .from(apiKey)
    .where(
      and(
        eq(apiKey.key, key),
        eq(apiKey.isActive, true),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}