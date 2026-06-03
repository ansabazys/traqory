import Fastify from "fastify";

import { healthRoute } from "./routes/health.route.js";
import { authRoutes } from "./modules/auth/routes/auth.route.js";

export const app = Fastify({
  logger: true,
});

app.register(healthRoute);
app.register(authRoutes)