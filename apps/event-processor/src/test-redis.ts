import "dotenv/config";
import IORedis from "ioredis";

console.log(
  "REDIS_URL:",
  process.env.REDIS_URL,
);

const redis = new IORedis(
  process.env.REDIS_URL!,
  {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  },
);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (err) => {
  console.error(err);
});