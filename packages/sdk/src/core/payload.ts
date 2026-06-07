import { client } from "../client";
import type { EventPayload } from "../types";
import { now } from "../utils/timestamp";
import { isBrowser } from "../utils/browser";
import { getContext } from "./context";

export function createPayload(
  event: string,
  properties: Record<string, unknown> = {},
): EventPayload {
  const config = client.getConfig();

  const context = getContext();

  const url = isBrowser
    ? window.location.href
    : "";

  const path = isBrowser
    ? window.location.pathname
    : "";

  const referrer = isBrowser
    ? document.referrer
    : "";

  const title = isBrowser
    ? document.title
    : "";

  return {
    apiKey: config.apiKey,

    event,

    visitorId: client.getVisitorId(),
    sessionId: client.getSessionId(),

    userId: client.getUserId(),

    timestamp: now(),

    url,
    path,
    referrer,
    title,

    language: context.language,
    timezone: context.timezone,
    screen: context.screen,

    properties,
  };
}