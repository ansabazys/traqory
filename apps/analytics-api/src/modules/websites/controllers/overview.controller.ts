import { FastifyRequest } from "fastify";

import { getOverviewService } from "../services/overview.service.js";

export async function getOverviewController(
  request: FastifyRequest<{
    Params: {
      websiteId: string;
    };
  }>,
) {
  const { websiteId } =
    request.params;

  return getOverviewService(
    websiteId,
  );
}