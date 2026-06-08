import { and, desc, asc, eq, isNull, ilike, or } from "drizzle-orm";
import { db, website } from "@traqory/database";
import type { NewWebsite } from "@traqory/database";

import type { UpdateWebsiteDto } from "../dto/website.dto.js";

export type WebsiteFilters = {
  search?: string;
  status?: "ACTIVE" | "INACTIVE" | "PENDING" | "ARCHIVED";
  environment?: "production" | "staging" | "development";
  sortBy?: "createdAt" | "name" | "domain";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export class WebsiteRepository {
  async create(data: NewWebsite) {
    const [record] = await db.insert(website).values(data).returning();
    return record;
  }

  async findBySlug(slug: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(and(eq(website.slug, slug), isNull(website.deletedAt)));

    return record ?? null;
  }

  async findByDomain(domain: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(and(eq(website.domain, domain), isNull(website.deletedAt)));

    return record ?? null;
  }

  async listByOwner(ownerId: string, filters: WebsiteFilters = {}) {
    const conditions = [
      eq(website.ownerId, ownerId),
      isNull(website.deletedAt),
    ];

    if (filters.status) {
      conditions.push(eq(website.status, filters.status));
    }

    if (filters.environment) {
      conditions.push(eq(website.environment, filters.environment));
    }

    if (filters.search) {
      conditions.push(
        or(
          ilike(website.name, `%${filters.search}%`),
          ilike(website.domain, `%${filters.search}%`),
        )!,
      );
    }

    // Sorting
    const sortBy = filters.sortBy ?? "createdAt";
    const sortOrder = filters.sortOrder ?? "desc";
    let orderByClause = desc(website.createdAt);

    if (sortBy === "name") {
      orderByClause = sortOrder === "asc" ? asc(website.name) : desc(website.name);
    } else if (sortBy === "domain") {
      orderByClause = sortOrder === "asc" ? asc(website.domain) : desc(website.domain);
    } else if (sortBy === "createdAt") {
      orderByClause = sortOrder === "asc" ? asc(website.createdAt) : desc(website.createdAt);
    }

    const query = db
      .select()
      .from(website)
      .where(and(...conditions))
      .orderBy(orderByClause)
      .$dynamic(); // Use dynamic to allow pagination to be appended conditionally

    if (filters.page && filters.limit) {
      const offset = (filters.page - 1) * filters.limit;
      return query.limit(filters.limit).offset(offset);
    }

    return query;
  }

  async findByIdAndOwner(id: string, ownerId: string) {
    const [record] = await db
      .select()
      .from(website)
      .where(
        and(
          eq(website.id, id),
          eq(website.ownerId, ownerId),
          isNull(website.deletedAt),
        ),
      );

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
      .where(
        and(
          eq(website.id, id),
          eq(website.ownerId, ownerId),
          isNull(website.deletedAt),
        ),
      )
      .returning();

    return record ?? null;
  }

  async deleteByIdAndOwner(id: string, ownerId: string) {
    const [record] = await db
      .update(website)
      .set({ deletedAt: new Date() })
      .where(
        and(
          eq(website.id, id),
          eq(website.ownerId, ownerId),
          isNull(website.deletedAt),
        ),
      )
      .returning({ id: website.id });

    return record ?? null;
  }
}

export const websiteRepository = new WebsiteRepository();
