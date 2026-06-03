import { client } from "../client";
import { createPayload } from "../core/payload";
import { eventQueue } from "../core/queue";

export function track(
  eventName: string,
  properties: Record<string, unknown> = {}
): void {
  if (!client.isInitialized()) {
    throw new Error(
      "[Traqory] SDK not initialized. Call init() first."
    );
  }

  if (!eventName) {
    throw new Error(
      "[Traqory] eventName is required."
    );
  }

  const payload = createPayload(
    eventName,
    properties
  );

  eventQueue.add(payload);
}