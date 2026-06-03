import type {FastifyRequest } from "fastify";

import { env } from "../config/env.js";
import { HttpError } from "../lib/http-error.js";

type AuthServiceSession = {
  user?: {
    id?: string;
    email?: string;
  };
} | null;

export async function requireAuth(
  request: FastifyRequest,
  // _reply: FastifyReply,
) {
  const cookie = request.headers.cookie;

  if (!cookie) {
    throw new HttpError(401, "Unauthorized");
  }

  const response = await fetch(`${env.AUTH_SERVICE_URL}/api/auth/get-session`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
  });

  if (!response.ok) {
    throw new HttpError(401, "Unauthorized");
  }

  const session = (await response.json()) as AuthServiceSession;
  const user = session?.user;

  if (!user?.id || !user.email) {
    throw new HttpError(401, "Unauthorized");
  }

  request.user = {
    id: user.id,
    email: user.email,
  };
}
