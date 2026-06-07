import type { FastifyRequest } from "fastify";

import {
  dateRangeQuerySchema,
  eventsQuerySchema,
  timelineQuerySchema,
  websiteParamsSchema,
  type DateRangeQuery,
  type EventsQuery,
  type TimelineQuery,
  type WebsiteParams,
} from "../dto/analytics.dto.js";
import {
  getActivePageAnalytics,
  getBrowserAnalytics,
  getCountryAnalytics,
  getDashboardAnalytics,
  getDeviceAnalytics,
  getEventTypesAnalytics,
  getEventsExplorer,
  getOverviewAnalytics,
  getRealtimeAnalytics,
  getRetentionAnalytics,
  getSessionAnalytics,
  getTimelineAnalytics,
  getTopEventAnalytics,
  getTopPageAnalytics,
} from "../services/analytics.service.js";

function params(request: FastifyRequest<{ Params: WebsiteParams }>): WebsiteParams {
  return websiteParamsSchema.parse(request.params);
}

function dateQuery(request: FastifyRequest<{ Querystring: DateRangeQuery }>): DateRangeQuery {
  return dateRangeQuerySchema.parse(request.query);
}

export async function overviewController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getOverviewAnalytics(params(request).websiteId, dateQuery(request));
}

export async function realtimeController(
  request: FastifyRequest<{ Params: WebsiteParams }>,
) {
  return getRealtimeAnalytics(params(request).websiteId);
}

export async function dashboardController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getDashboardAnalytics(params(request).websiteId, dateQuery(request));
}

export async function timelineController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: TimelineQuery }>,
) {
  const parsedParams = params(request);
  const query = timelineQuerySchema.parse(request.query);
  return getTimelineAnalytics(parsedParams.websiteId, query, query.interval);
}

export async function topEventsController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getTopEventAnalytics(params(request).websiteId, dateQuery(request));
}

export async function topPagesController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getTopPageAnalytics(params(request).websiteId, dateQuery(request));
}

export async function devicesController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getDeviceAnalytics(params(request).websiteId, dateQuery(request));
}

export async function browsersController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getBrowserAnalytics(params(request).websiteId, dateQuery(request));
}

export async function countriesController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getCountryAnalytics(params(request).websiteId, dateQuery(request));
}

export async function retentionController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getRetentionAnalytics(params(request).websiteId, dateQuery(request));
}

export async function eventsController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: EventsQuery }>,
) {
  const parsedQuery = eventsQuerySchema.parse(request.query);
  return getEventsExplorer(params(request).websiteId, parsedQuery);
}

export async function eventTypesController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getEventTypesAnalytics(params(request).websiteId, dateQuery(request));
}

export async function activePagesController(
  request: FastifyRequest<{ Params: WebsiteParams }>,
) {
  return getActivePageAnalytics(params(request).websiteId);
}

export async function sessionsController(
  request: FastifyRequest<{ Params: WebsiteParams; Querystring: DateRangeQuery }>,
) {
  return getSessionAnalytics(params(request).websiteId, dateQuery(request));
}
