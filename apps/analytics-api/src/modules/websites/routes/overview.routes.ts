import { FastifyInstance } from "fastify";

import { getOverviewController } from "../controllers/overview.controller.js";

export async function overviewRoutes(
  app: FastifyInstance,
) {
  app.get(
    "/:websiteId/overview",
    getOverviewController,
  );
}