import type { EventPayload } from "../types";
import { client } from "../client";
import { debug } from "../utils/logger";

function serializeEvents(
  events: EventPayload[],
) {
  return events.map((event) => ({
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

    utm_source: event.utm_source,
    utm_medium: event.utm_medium,
    utm_campaign: event.utm_campaign,
    utm_term: event.utm_term,
    utm_content: event.utm_content,

    properties: event.properties,

    sdkVersion: event.sdkVersion,
  }));
}

export async function sendBatch(
  events: EventPayload[],
): Promise<void> {
  const { endpoint, apiKey } =
    client.getConfig();

  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10_000);

  try {
    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          apiKey,
          events:
            serializeEvents(events),
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const text =
        await response.text();

      throw new Error(
        `HTTP ${response.status}: ${text}`,
      );
    }

    debug(
      `Batch sent (${events.length} events)`,
    );
  } catch (error) {
    debug(
      "Failed to send batch",
      error,
    );

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function sendBeaconBatch(
  events: EventPayload[],
): boolean {
  if (
    typeof navigator ===
      "undefined" ||
    !navigator.sendBeacon
  ) {
    return false;
  }

  const { endpoint, apiKey } =
    client.getConfig();

  const payload = {
    apiKey,
    events:
      serializeEvents(events),
  };

  const blob = new Blob(
    [JSON.stringify(payload)],
    {
      type: "application/json",
    },
  );

  return navigator.sendBeacon(
    endpoint,
    blob,
  );
}