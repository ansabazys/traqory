import { client } from '../client';
import type { EventPayload } from '../types';
import { now } from '../utils/timestamp';
import { isBrowser } from '../utils/browser';

import { getContext } from './context';
import { getUTMParams } from './utm';
import { SDK_VERSION } from '../version';

export function createPayload(
  event: string,
  properties: Record<string, unknown> = {},
): EventPayload {
  const config = client.getConfig();

  const context = getContext();
  const utm = getUTMParams();

  const url = isBrowser ? window.location.href : '';

  const path = isBrowser ? window.location.pathname : '';

  const referrer = isBrowser ? document.referrer : '';

  const title = isBrowser ? document.title : '';

  return {
    apiKey: config.apiKey,

    event,

    sdkVersion: SDK_VERSION,

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

    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_term: utm.utm_term,
    utm_content: utm.utm_content,

    properties,
  };
}
