import Fastify from "fastify";
import cors from "@fastify/cors";
import { eventsRoutes } from "./routes/events";



export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors);

  await app.register(eventsRoutes, {
    prefix: "/v1/events",
  });

  return app;
}