import Fastify from "fastify";
import cors from "@fastify/cors";

import { healthRoute } from "./routes/health.route.js";
import { authRoutes } from "./modules/auth/routes/auth.route.js";
import { userRoutes } from "./modules/users/routes/user.route.js";
import { authPlugin } from "./plugins/auth.plugin.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { rateLimitMiddleware } from "./middleware/rate-limit.middleware.js";
import { env } from "./config/env.js";

export const app = Fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
  },
});

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
});

await app.register(errorMiddleware);
await app.register(rateLimitMiddleware);
await app.register(authPlugin);

app.register(healthRoute);
app.register(authRoutes);
app.register(userRoutes);
