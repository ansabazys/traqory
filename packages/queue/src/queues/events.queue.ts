import { Queue } from "bullmq";

import { createRedis } from "../config/redis.js";

export const eventsQueue = new Queue(
  "events",
  {
    connection: createRedis(),
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  },
);