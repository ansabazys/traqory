import { and, desc, eq } from "drizzle-orm";
import { db, website } from "@traqory/database";
import type { NewWebsite } from "@traqory/database";

import type { UpdateWebsiteDto } from "../dto/website.dto.js";

export class WebsiteRepository {
  async create(data: NewWebsite) {
    const [record] = await db.insert(website).values(data).returning();
    return record;
  }

  async findBySlug(slug: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(eq(website.slug, slug));

    return record ?? null;
  }

  async findByDomain(domain: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(eq(website.domain, domain));

    return record ?? null;
  }

  async listByOwner(ownerId: string) {
    return db
      .select()
      .from(website)
      .where(eq(website.ownerId, ownerId))
      .orderBy(desc(website.createdAt));
  }

  async findByIdAndOwner(id: string, ownerId: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(and(eq(website.id, id), eq(website.ownerId, ownerId)));

    return record ?? null;
  }

  async updateByIdAndOwner(
    id: string,
    ownerId: string,
    data: UpdateWebsiteDto,
  ) {
    const [record] = await db
      .update(website)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(website.id, id), eq(website.ownerId, ownerId)))
      .returning();

    return record ?? null;
  }

  async deleteByIdAndOwner(id: string, ownerId: string) {
    const [record] = await db
      .delete(website)
      .where(and(eq(website.id, id), eq(website.ownerId, ownerId)))
      .returning({ id: website.id });

    return record ?? null;
  }
}

export const websiteRepository = new WebsiteRepository();
