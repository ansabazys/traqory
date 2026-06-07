import type { EventPayload } from "../types";
import { client } from "../client";
import { debug } from "../utils/logger";

export async function sendEvent(
  payload: EventPayload,
): Promise<void> {
  const { endpoint } =
    client.getConfig();

  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10_000);

  try {
    const response = await fetch(
      endpoint!,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          apiKey: payload.apiKey,

          events: [
            {
              event: payload.event,

              path: payload.path,
              url: payload.url,

              timestamp:
                payload.timestamp,

              visitorId:
                payload.visitorId,

              sessionId:
                payload.sessionId,

              userId:
                payload.userId,

              referrer:
                payload.referrer,

              title:
                payload.title,

              properties:
                payload.properties,
            },
          ],
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
      "Event sent",
      payload.event,
    );
  } catch (error) {
    debug(
      "Failed to send event",
      error,
    );

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}