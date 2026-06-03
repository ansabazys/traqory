import type { FastifyInstance } from "fastify";

import { requireAuth } from "../../../middleware/auth.middleware.js";
import { validateBody } from "../../../lib/validate.js";
import { userService } from "../services/user.service.js";
import {
  changePasswordPayloadSchema,
  deleteUserPayloadSchema,
  updateProfilePayloadSchema,
} from "../validators/user.validator.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/api/users/me", { preHandler: requireAuth }, async (request) => {
    return userService.getMe(request.user!.id);
  });

  app.patch("/api/users/me", { preHandler: requireAuth }, async (request) => {
    const payload = validateBody(request, updateProfilePayloadSchema);
    return userService.updateMe(request.user!.id, payload);
  });

  app.patch(
    "/api/users/change-password",
    { preHandler: requireAuth },
    async (request) => {
      const payload = validateBody(request, changePasswordPayloadSchema);
      return userService.changePassword(request, payload);
    },
  );

  app.delete("/api/users/me", { preHandler: requireAuth }, async (request) => {
    const payload = validateBody(request, deleteUserPayloadSchema);
    return userService.deleteMe(request, payload);
  });
}
