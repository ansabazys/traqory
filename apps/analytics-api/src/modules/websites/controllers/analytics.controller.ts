import { FastifyRequest } from "fastify";

import {
  getOverview,
  getPageViews,
} from "../services/analytics.service.js";

type WebsiteParams = {
  websiteId: string;
};

export async function getOverviewController(
  request: FastifyRequest<{
    Params: WebsiteParams;
  }>,
) {
  return getOverview(
    request.params.websiteId,
  );
}

export async function getPageViewsController(
  request: FastifyRequest<{
    Params: WebsiteParams;
  }>,
) {
  return getPageViews(
    request.params.websiteId,
  );
}