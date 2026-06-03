import { HttpError } from '../../../lib/http-error.js';
import { generateTrackingKey } from '../../../lib/api-key-generator.js';
import { normalizeDomain } from '../../../lib/domain.js';
import { slugify } from '../../../lib/slug.js';
import type { CreateWebsiteDto, UpdateWebsiteDto } from '../dto/website.dto.js';
import { apiKeyRepository } from '../repositories/api-key.repository.js';
import { websiteRepository } from '../repositories/website.repository.js';

export class WebsiteService {
  async createWebsite(ownerId: string, payload: CreateWebsiteDto) {
    const domain = normalizeDomain(payload.domain);

    if (await websiteRepository.findByDomain(domain)) {
      throw new HttpError(409, 'Domain is already registered');
    }

    const slug = await this.createUniqueSlug(payload.name);

    const record = await websiteRepository.create({
      name: payload.name.trim(),
      domain,
      slug,
      ownerId,
    });

    return record;
  }

  listWebsites(ownerId: string) {
    return websiteRepository.listByOwner(ownerId);
  }

  async getWebsite(id: string, ownerId: string) {
    const record = await websiteRepository.findByIdAndOwner(id, ownerId);

    if (!record) {
      throw new HttpError(404, 'Website not found');
    }

    return record;
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

    return record;
  }

  async deleteWebsite(id: string, ownerId: string) {
    const record = await websiteRepository.deleteByIdAndOwner(id, ownerId);

    if (!record) {
      throw new HttpError(404, 'Website not found');
    }

    return { success: true };
  }

  async createApiKey(
    websiteId: string,
    ownerId: string,
    // _payload: CreateApiKeyDto,
  ) {
    await this.getWebsite(websiteId, ownerId);

    const key = await this.createUniqueTrackingKey();
    const record = await apiKeyRepository.create(websiteId, key);

    return record;
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

    return { success: true };
  }

  async rotateApiKey(id: string, ownerId: string) {
    const existing = await apiKeyRepository.findByIdForOwner(id, ownerId);

    if (!existing) {
      throw new HttpError(404, 'API key not found');
    }

    if (!existing.apiKey.isActive) {
      throw new HttpError(400, 'Cannot rotate a revoked API key');
    }

    const key = await this.createUniqueTrackingKey();
    const record = await apiKeyRepository.rotateByIdForOwner(id, ownerId, key);

    if (!record) {
      throw new HttpError(404, 'API key not found');
    }

    return record;
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

  private async createUniqueTrackingKey() {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const key = generateTrackingKey();

      if (!(await apiKeyRepository.findByKey(key))) {
        return key;
      }
    }

    throw new HttpError(500, 'Unable to generate a unique API key');
  }
}

export const websiteService = new WebsiteService();
