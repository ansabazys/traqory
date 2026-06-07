import type { EventPayload } from '../types';
import { client } from '../client';
import { debug } from '../utils/logger';

export async function sendBatch(events: EventPayload[]): Promise<void> {
  const { endpoint } = client.getConfig();

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10_000);

  try {
    if (!endpoint) {
      throw new Error('Traqory endpoint is not configured');
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: client.getConfig().apiKey,

        events: events.map((event) => ({
          event: event.event,

          path: event.path,
          url: event.url,

          timestamp: event.timestamp,

          visitorId: event.visitorId,

          sessionId: event.sessionId,

          userId: event.userId,

          referrer: event.referrer,

          title: event.title,

          language: event.language,
          timezone: event.timezone,
          screen: event.screen,

          properties: event.properties,
        })),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    debug(`Batch sent (${events.length} events)`);
  } catch (error) {
    debug('Failed to send batch', error);

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function sendBeaconBatch(events: EventPayload[]): boolean {
  if (typeof navigator === 'undefined' || !navigator.sendBeacon) {
    return false;
  }

  const { endpoint, apiKey } = client.getConfig();

  const payload = {
    apiKey,
    events: events.map((event) => ({
      event: event.event,

      path: event.path,
      url: event.url,

      timestamp: event.timestamp,

      visitorId: event.visitorId,
      sessionId: event.sessionId,
      userId: event.userId,

      referrer: event.referrer,
      title: event.title,

      properties: event.properties,
    })),
  };

  const blob = new Blob([JSON.stringify(payload)], {
    type: 'application/json',
  });

  return navigator.sendBeacon(endpoint, blob);
}
