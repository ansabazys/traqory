import "dotenv/config";

import { buildApp } from "./app";
import { env } from "./config/env";

async function start() {
  const app = await buildApp();

  await app.listen({
    port: env.INGESTION_SERVICE_PORT,
    host: "0.0.0.0",
  });
}

start();