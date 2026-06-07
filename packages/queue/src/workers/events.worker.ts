import { Job, Worker } from "bullmq";

import { createRedis } from "../config/redis.js";
import type { EventJob } from "../types/event-job.js";

export function createEventsWorker(
  processor: (
    job: Job<EventJob[]>,
  ) => Promise<void>,
) {
  return new Worker<EventJob[]>(
    "events",
    processor,
    {
      connection: createRedis(),
    },
  );
}