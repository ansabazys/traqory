import { Job, Worker } from "bullmq";

import type { EventJob } from "../types/event-job.js";

export function createEventsWorker(
  processor: (
    job: Job<EventJob>,
  ) => Promise<void>,
) {
  return new Worker<EventJob>(
    "events",
    processor,
    {
      connection: {
        url: process.env.REDIS_URL!,
      },
    },
  );
}