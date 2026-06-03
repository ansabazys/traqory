import type { EventPayload } from "../types";
import { client } from "../client";

export async function sendEvent(
  payload: EventPayload
): Promise<void> {
  const { endpoint, debug } =
    client.getConfig();

  try {
    const response = await fetch(
      endpoint!,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    if (debug) {
      console.log(
        "[Traqory] Event sent",
        payload
      );
    }
  } catch (error) {
    if (debug) {
      console.error(
        "[Traqory] Failed to send event",
        error
      );
    }

    throw error;
  }
}