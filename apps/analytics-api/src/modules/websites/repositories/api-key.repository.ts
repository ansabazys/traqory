import { and, desc, eq } from 'drizzle-orm';
import { apiKey, db, website } from '@traqory/database';

export class ApiKeyRepository {
  async findByKey(key: string) {
    // In our new schema, findByKey is used for validating requests.
    // The key passed is the hashed key or we look up by hashed key in findApiKeyByKey in the shared db package.
    // Let's implement it to find by hashed key.
    const [record] = await db.select().from(apiKey).where(eq(apiKey.hashedKey, key));

    return record ?? null;
  }

  async create(websiteId: string, hashedKey: string, prefix: string, name: string, createdBy: string, expiresAt: Date | null) {
    const [record] = await db.insert(apiKey).values({
      websiteId,
      hashedKey,
      prefix,
      name,
      createdBy,
      expiresAt,
    }).returning();

    return record;
  }

  async listByWebsiteId(websiteId: string) {
    return db
      .select({
        id: apiKey.id,
        websiteId: apiKey.websiteId,
        name: apiKey.name,
        prefix: apiKey.prefix,
        createdAt: apiKey.createdAt,
        updatedAt: apiKey.updatedAt,
        expiresAt: apiKey.expiresAt,
        lastUsedAt: apiKey.lastUsedAt,
        rotatedAt: apiKey.rotatedAt,
        revokedAt: apiKey.revokedAt,
        createdBy: apiKey.createdBy,
      })
      .from(apiKey)
      .where(eq(apiKey.websiteId, websiteId))
      .orderBy(desc(apiKey.createdAt));
  }
  
  async findByIdForOwner(id: string, ownerId: string) {
    const [record] = await db
      .select({ apiKey, website })
      .from(apiKey)
      .innerJoin(website, eq(apiKey.websiteId, website.id))
      .where(and(eq(apiKey.id, id), eq(website.ownerId, ownerId)));

    return record ?? null;
  }

  async revokeByIdForOwner(id: string, ownerId: string) {
    const record = await this.findByIdForOwner(id, ownerId);

    if (!record) {
      return null;
    }

    const [updated] = await db
      .update(apiKey)
      .set({ revokedAt: new Date() })
      .where(eq(apiKey.id, id))
      .returning();

    return updated ?? null;
  }

  async rotateByIdForOwner(id: string, ownerId: string, newHashedKey: string, newPrefix: string, expiresAt: Date | null) {
    return db.transaction(async (tx) => {
      const [record] = await tx
        .select({ apiKey, website })
        .from(apiKey)
        .innerJoin(website, eq(apiKey.websiteId, website.id))
        .where(and(eq(apiKey.id, id), eq(website.ownerId, ownerId)));

      if (!record) {
        return null;
      }

      await tx.update(apiKey).set({ revokedAt: new Date() }).where(eq(apiKey.id, id));

      const [created] = await tx
        .insert(apiKey)
        .values({
          websiteId: record.apiKey.websiteId,
          hashedKey: newHashedKey,
          prefix: newPrefix,
          name: record.apiKey.name,
          createdBy: ownerId,
          expiresAt,
        })
        .returning();

      return {
        oldKey: record.apiKey,
        newKey: created,
      };
    });
  }
}

export const apiKeyRepository = new ApiKeyRepository();
