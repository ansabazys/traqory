import type { FastifyReply, FastifyRequest } from "fastify";

import { validateBody } from "../../../lib/validate.js";
import { websiteService } from "../services/website.service.js";
import {
  createApiKeySchema,
  createWebsiteSchema,
  updateWebsiteSchema,
} from "../validators/website.validator.js";

type IdParams = {
  id: string;
};

export class WebsiteController {
  async createWebsite(request: FastifyRequest, reply: FastifyReply) {
    const payload = validateBody(request, createWebsiteSchema);
    const website = await websiteService.createWebsite(
      request.user!.id,
      payload,
    );

    return reply.status(201).send(website);
  }

  listWebsites(request: FastifyRequest) {
    return websiteService.listWebsites(request.user!.id);
  }

  getWebsite(request: FastifyRequest<{ Params: IdParams }>) {
    return websiteService.getWebsite(request.params.id, request.user!.id);
  }

  updateWebsite(request: FastifyRequest<{ Params: IdParams }>) {
    const payload = validateBody(request, updateWebsiteSchema);
    return websiteService.updateWebsite(
      request.params.id,
      request.user!.id,
      payload,
    );
  }

  deleteWebsite(request: FastifyRequest<{ Params: IdParams }>) {
    return websiteService.deleteWebsite(request.params.id, request.user!.id);
  }

  async createApiKey(
    request: FastifyRequest<{ Params: IdParams }>,
    reply: FastifyReply,
  ) {
    validateBody(request, createApiKeySchema);
    const apiKey = await websiteService.createApiKey(
      request.params.id,
      request.user!.id,
    );

    return reply.status(201).send(apiKey);
  }

  listApiKeys(request: FastifyRequest<{ Params: IdParams }>) {
    return websiteService.listApiKeys(request.params.id, request.user!.id);
  }

  revokeApiKey(request: FastifyRequest<{ Params: IdParams }>) {
    return websiteService.revokeApiKey(request.params.id, request.user!.id);
  }

  rotateApiKey(request: FastifyRequest<{ Params: IdParams }>) {
    return websiteService.rotateApiKey(request.params.id, request.user!.id);
  }
}

export const websiteController = new WebsiteController();
