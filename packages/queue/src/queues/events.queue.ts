import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const eventsQueue = new Queue(
  "events",
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  },
);