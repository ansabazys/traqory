import { and, desc, eq } from 'drizzle-orm';
import { apiKey, db, website } from '@traqory/database';

export class ApiKeyRepository {
  async findByKey(key: string) {
    const [record] = await db.select().from(apiKey).where(eq(apiKey.key, key));

    return record ?? null;
  }

  async create(websiteId: string, key: string) {
    const [record] = await db.insert(apiKey).values({ websiteId, key }).returning();

    return record;
  }

  async listByWebsiteId(websiteId: string) {
    return db
      .select({
        id: apiKey.id,
        key: apiKey.key,
        websiteId: apiKey.websiteId,
        createdAt: apiKey.createdAt,
        lastUsedAt: apiKey.lastUsedAt,
        isActive: apiKey.isActive,
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
      .set({ isActive: false })
      .where(eq(apiKey.id, id))
      .returning();

    return updated ?? null;
  }

  async rotateByIdForOwner(id: string, ownerId: string, newKey: string) {
    return db.transaction(async (tx) => {
      const [record] = await tx
        .select({ apiKey, website })
        .from(apiKey)
        .innerJoin(website, eq(apiKey.websiteId, website.id))
        .where(and(eq(apiKey.id, id), eq(website.ownerId, ownerId)));

      if (!record) {
        return null;
      }

      await tx.update(apiKey).set({ isActive: false }).where(eq(apiKey.id, id));

      const [created] = await tx
        .insert(apiKey)
        .values({
          websiteId: record.apiKey.websiteId,
          key: newKey,
        })
        .returning();

      return created ?? null;
    });
  }
}

export const apiKeyRepository = new ApiKeyRepository();
