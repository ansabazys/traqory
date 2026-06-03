import type { FastifyRequest } from "fastify";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../config/auth.js";
import { HttpError } from "../lib/http-error.js";

export async function resolveSession(request: FastifyRequest) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  request.authSession = session;
  request.user = session?.user ?? null;

  return session;
}

export async function requireAuth(
  request: FastifyRequest,
  // _reply: FastifyReply,
) {
  const session = request.authSession ?? (await resolveSession(request));

  if (!session) {
    throw new HttpError(401, "Authentication required");
  }
}
