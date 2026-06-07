import { eventsQueue } from "@traqory/queue";

export async function enqueueEvents(
  events: unknown[],
) {
  await eventsQueue.add(
    "track-events",
    events,
  );
}