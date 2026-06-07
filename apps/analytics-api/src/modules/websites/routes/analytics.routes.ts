import { FastifyInstance } from "fastify";

import {
  getOverviewController,
  getPageViewsController,
} from "../controllers/analytics.controller.js";

export async function analyticsRoutes(
  app: FastifyInstance,
) {
  app.get(
    "/:websiteId/overview",
    getOverviewController,
  );

  app.get(
    "/:websiteId/pageviews",
    getPageViewsController,
  );
}