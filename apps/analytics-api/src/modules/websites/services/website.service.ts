import { randomBytes, createHash } from 'node:crypto';
import { and, desc, eq, inArray, isNull } from 'drizzle-orm';
import {
  db,
  apiKey,
  createAuditLog,
  getWebsitesOverviewStats,
  getWebsitesSparklines,
} from '@traqory/database';
import { HttpError } from '../../../lib/http-error.js';
import { normalizeDomain } from '../../../lib/domain.js';
import { slugify } from '../../../lib/slug.js';
import type { CreateWebsiteDto, UpdateWebsiteDto } from '../dto/website.dto.js';
import { apiKeyRepository } from '../repositories/api-key.repository.js';
import { websiteRepository } from '../repositories/website.repository.js';

function resolveStatus(
  events24h: number,
  lastActive: string | null,
): 'active' | 'inactive' | 'no_data' {
  if (!events24h || !lastActive) return 'no_data';

  const minutesSinceActive = (Date.now() - new Date(lastActive).getTime()) / (1000 * 60);
  if (minutesSinceActive > 90) return 'inactive';

  return 'active';
}

function generateApiKeyString(environment: string) {
  const prefix = environment === 'production' ? 'trq_live' : 'trq_test';
  return `${prefix}_${randomBytes(24).toString('hex')}`;
}

function getApiKeyPrefix(key: string) {
  const parts = key.split('_');
  const base = parts.slice(0, 2).join('_');
  const secretPart = parts[2] ?? '';
  return `${base}_${secretPart.slice(0, 4)}`;
}

function hashApiKey(key: string) {
  return createHash('sha256').update(key).digest('hex');
}

async function logAudit(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  metadata?: Record<string, unknown>,
) {
  try {
    await createAuditLog({
      userId,
      action,
      resourceType,
      resourceId,
      metadata,
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

export class WebsiteService {
  async createWebsite(ownerId: string, payload: CreateWebsiteDto) {
    const domain = normalizeDomain(payload.domain);

    if (await websiteRepository.findByDomain(domain)) {
      throw new HttpError(409, 'Domain is already registered');
    }

    const slug = await this.createUniqueSlug(payload.name);

    const website = await websiteRepository.create({
      name: payload.name.trim(),
      domain,
      slug,
      ownerId,
      description: payload.description,
      environment: payload.environment ?? 'production',
      timezone: payload.timezone ?? 'UTC',
    });

    if (!website) {
      throw new HttpError(500, 'Failed to create website');
    }

    const plaintextKey = generateApiKeyString(website.environment);
    const hashedKey = hashApiKey(plaintextKey);
    const prefix = getApiKeyPrefix(plaintextKey);

    const apiKeyRecord = await apiKeyRepository.create(
      website.id,
      hashedKey,
      prefix,
      'Default Key',
      ownerId,
      null,
    );

    if (!apiKeyRecord) {
      throw new HttpError(500, 'Failed to create API key');
    }

    await logAudit(ownerId, 'website.created', 'website', website.id);
    await logAudit(ownerId, 'api_key.created', 'api_key', apiKeyRecord.id);

    return {
      ...website,
      status: 'no_data' as const,
      dbStatus: website.status,
      apiKey: plaintextKey, // Return plaintext once
      apiKeyId: apiKeyRecord.id,
      events24h: 0,
      activeUsers: 0,
      lastActive: undefined,
      sparkline: Array(24).fill(0),
    };
  }

  async listWebsites(ownerId: string, filters: Record<string, unknown> = {}) {
    const list = await websiteRepository.listByOwner(ownerId, filters);
    if (list.length === 0) return [];

    const ids = list.map((w) => w.id);
    const [stats, sparklines, apiKeys] = await Promise.all([
      getWebsitesOverviewStats(ids),
      getWebsitesSparklines(ids),
      db
        .select({
          id: apiKey.id,
          websiteId: apiKey.websiteId,
          prefix: apiKey.prefix,
        })
        .from(apiKey)
        .where(and(inArray(apiKey.websiteId, ids), isNull(apiKey.revokedAt)))
        .orderBy(desc(apiKey.createdAt)),
    ]);

    const keysMap: Record<string, { id: string; key: string }> = {};
    for (const key of apiKeys) {
      if (!keysMap[key.websiteId]) {
        keysMap[key.websiteId] = {
          id: key.id,
          key: `${key.prefix}****************`,
        };
      }
    }

    return list.map((w) => {
      const wStats = stats[w.id] ?? { events24h: 0, activeUsers: 0, lastActive: null };
      const sparkline = sparklines[w.id] ?? Array(24).fill(0);
      const keyInfo = keysMap[w.id] ?? { id: '', key: '' };
      const resolvedStatus = resolveStatus(wStats.events24h, wStats.lastActive);

      return {
        id: w.id,
        name: w.name,
        domain: w.domain,
        description: w.description ?? undefined,
        status: resolvedStatus,
        dbStatus: w.status,
        environment: w.environment,
        timezone: w.timezone ?? undefined,
        favicon: w.favicon ?? undefined,
        apiKey: keyInfo.key,
        apiKeyId: keyInfo.id,
        events24h: wStats.events24h,
        activeUsers: wStats.activeUsers,
        lastActive: wStats.lastActive ?? undefined,
        sparkline,
        ownerId: w.ownerId,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
      };
    });
  }

  async getWebsite(id: string, ownerId: string) {
    const record = await websiteRepository.findByIdAndOwner(id, ownerId);

    if (!record) {
      throw new HttpError(404, 'Website not found');
    }

    const [stats, sparklines, apiKeys] = await Promise.all([
      getWebsitesOverviewStats([id]),
      getWebsitesSparklines([id]),
      db
        .select({
          id: apiKey.id,
          websiteId: apiKey.websiteId,
          prefix: apiKey.prefix,
        })
        .from(apiKey)
        .where(and(eq(apiKey.websiteId, id), isNull(apiKey.revokedAt)))
        .orderBy(desc(apiKey.createdAt)),
    ]);

    const wStats = stats[id] ?? { events24h: 0, activeUsers: 0, lastActive: null };
    const sparkline = sparklines[id] ?? Array(24).fill(0);
    const keyInfo = apiKeys[0]
      ? { id: apiKeys[0].id, key: `${apiKeys[0].prefix}****************` }
      : { id: '', key: '' };
    const resolvedStatus = resolveStatus(wStats.events24h, wStats.lastActive);

    return {
      id: record.id,
      name: record.name,
      domain: record.domain,
      description: record.description ?? undefined,
      status: resolvedStatus,
      dbStatus: record.status,
      environment: record.environment,
      timezone: record.timezone ?? undefined,
      favicon: record.favicon ?? undefined,
      apiKey: keyInfo.key,
      apiKeyId: keyInfo.id,
      events24h: wStats.events24h,
      activeUsers: wStats.activeUsers,
      lastActive: wStats.lastActive ?? undefined,
      sparkline,
      ownerId: record.ownerId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }

  async updateWebsite(id: string, ownerId: string, payload: UpdateWebsiteDto) {
    const existing = await this.getWebsite(id, ownerId);
    const data: UpdateWebsiteDto = { ...payload };

    if (payload.domain) {
      const domain = normalizeDomain(payload.domain);
      const domainOwner = await websiteRepository.findByDomain(domain);

      if (domainOwner && domainOwner.id !== existing.id) {
        throw new HttpError(409, 'Domain is already registered');
      }

      data.domain = domain;
    }

    const record = await websiteRepository.updateByIdAndOwner(id, ownerId, data);

    if (!record) {
      throw new HttpError(404, 'Website not found');
    }

    await logAudit(ownerId, 'website.updated', 'website', id, payload);

    return record;
  }

  async deleteWebsite(id: string, ownerId: string) {
    const record = await websiteRepository.deleteByIdAndOwner(id, ownerId);

    if (!record) {
      throw new HttpError(404, 'Website not found');
    }

    await logAudit(ownerId, 'website.deleted', 'website', id);

    return { success: true };
  }

  async createApiKey(
    websiteId: string,
    ownerId: string,
    payload?: { name?: string; expiresInDays?: string; customExpiresAt?: string | null },
  ) {
    const w = await this.getWebsite(websiteId, ownerId);

    const plaintextKey = generateApiKeyString(w.environment);
    const hashedKey = hashApiKey(plaintextKey);
    const prefix = getApiKeyPrefix(plaintextKey);

    let expiresAt: Date | null = null;
    if (payload?.expiresInDays && payload.expiresInDays !== 'never') {
      const days = parseInt(payload.expiresInDays);
      if (!isNaN(days)) {
        expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      }
    } else if (payload?.customExpiresAt) {
      expiresAt = new Date(payload.customExpiresAt);
    }

    const record = await apiKeyRepository.create(
      websiteId,
      hashedKey,
      prefix,
      payload?.name || 'New API Key',
      ownerId,
      expiresAt,
    );

    if (!record) {
      throw new HttpError(500, 'Failed to create API key');
    }

    await logAudit(ownerId, 'api_key.created', 'api_key', record.id);

    return {
      ...record,
      key: plaintextKey, // Return plaintext once
    };
  }

  async listApiKeys(websiteId: string, ownerId: string) {
    await this.getWebsite(websiteId, ownerId);
    return apiKeyRepository.listByWebsiteId(websiteId);
  }

  async revokeApiKey(id: string, ownerId: string) {
    const record = await apiKeyRepository.revokeByIdForOwner(id, ownerId);

    if (!record) {
      throw new HttpError(404, 'API key not found');
    }

    await logAudit(ownerId, 'api_key.revoked', 'api_key', id);

    return { success: true };
  }

  async rotateApiKey(id: string, ownerId: string) {
    const existing = await apiKeyRepository.findByIdForOwner(id, ownerId);

    if (!existing) {
      throw new HttpError(404, 'API key not found');
    }

    if (existing.apiKey.revokedAt) {
      throw new HttpError(400, 'Cannot rotate a revoked API key');
    }

    const plaintextKey = generateApiKeyString(existing.website.environment);
    const hashedKey = hashApiKey(plaintextKey);
    const prefix = getApiKeyPrefix(plaintextKey);

    const result = await apiKeyRepository.rotateByIdForOwner(
      id,
      ownerId,
      hashedKey,
      prefix,
      existing.apiKey.expiresAt,
    );

    if (!result || !result.newKey) {
      throw new HttpError(404, 'API key not found');
    }

    await logAudit(ownerId, 'api_key.rotated', 'api_key', result.newKey.id, { oldKeyId: id });

    return {
      ...result.newKey,
      key: plaintextKey, // Return plaintext once
    };
  }

  private async createUniqueSlug(name: string) {
    const baseSlug = slugify(name);

    for (let attempt = 0; attempt < 25; attempt += 1) {
      const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;

      if (!(await websiteRepository.findBySlug(slug))) {
        return slug;
      }
    }

    throw new HttpError(409, 'Unable to generate a unique slug');
  }
}

export const websiteService = new WebsiteService();
