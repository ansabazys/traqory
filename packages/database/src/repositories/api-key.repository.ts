import { and, eq, gt, isNull, or } from "drizzle-orm";
import { createHash } from "node:crypto";

import { db } from "../client.js";
import { apiKey } from "../schema/analytics/api-key.schema.js";

export function hashApiKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export async function findApiKeyByKey(key: string) {
  const hashed = hashApiKey(key);
  const now = new Date();

  const result = await db
    .select()
    .from(apiKey)
    .where(
      and(
        eq(apiKey.hashedKey, hashed),
        isNull(apiKey.revokedAt),
        or(
          isNull(apiKey.expiresAt),
          gt(apiKey.expiresAt, now),
        ),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}