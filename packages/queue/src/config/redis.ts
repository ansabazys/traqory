import IORedis from "ioredis";

export function createRedis() {
  return new IORedis(
    process.env.REDIS_URL!,
    {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
  );
}