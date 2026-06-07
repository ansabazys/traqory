import type { FastifyInstance, RouteShorthandOptions } from "fastify";

import {
  activePagesController,
  browsersController,
  countriesController,
  dashboardController,
  devicesController,
  eventTypesController,
  eventsController,
  overviewController,
  realtimeController,
  retentionController,
  sessionsController,
  timelineController,
  topEventsController,
  topPagesController,
} from "../controllers/analytics.controller.js";

const paramsSchema = {
  type: "object",
  required: ["websiteId"],
  properties: {
    websiteId: { type: "string" },
  },
} as const;

const dateQuerySchema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
  },
} as const;

const timelineQuerySchema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
    interval: { type: "string", enum: ["hour", "day", "week", "month"] },
  },
} as const;

const eventsQuerySchema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
    page: { type: "integer", minimum: 1 },
    limit: { type: "integer", minimum: 1, maximum: 200 },
    event: { type: "string" },
    path: { type: "string" },
    search: { type: "string" },
    status: { type: "string" },
  },
} as const;

const withDateQuery: RouteShorthandOptions = {
  schema: {
    params: paramsSchema,
    querystring: dateQuerySchema,
  },
};

export async function analyticsRoutes(app: FastifyInstance) {
  app.get("/:websiteId/overview", withDateQuery, overviewController);
  app.get("/:websiteId/realtime", { schema: { params: paramsSchema } }, realtimeController);
  app.get("/:websiteId/dashboard", withDateQuery, dashboardController);
  app.get(
    "/:websiteId/timeline",
    { schema: { params: paramsSchema, querystring: timelineQuerySchema } },
    timelineController,
  );
  app.get("/:websiteId/top-events", withDateQuery, topEventsController);
  app.get("/:websiteId/top-pages", withDateQuery, topPagesController);
  app.get("/:websiteId/devices", withDateQuery, devicesController);
  app.get("/:websiteId/browsers", withDateQuery, browsersController);
  app.get("/:websiteId/countries", withDateQuery, countriesController);
  app.get("/:websiteId/retention", withDateQuery, retentionController);
  app.get(
    "/:websiteId/events",
    { schema: { params: paramsSchema, querystring: eventsQuerySchema } },
    eventsController,
  );
  app.get("/:websiteId/event-types", withDateQuery, eventTypesController);
  app.get("/:websiteId/active-pages", { schema: { params: paramsSchema } }, activePagesController);
  app.get("/:websiteId/sessions", withDateQuery, sessionsController);
}
