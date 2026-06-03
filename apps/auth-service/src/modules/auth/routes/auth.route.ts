import type { FastifyInstance } from "fastify";
import { auth } from "../../../config/auth.js";

export async function authRoutes(app: FastifyInstance) {
  app.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    handler: async (request, reply) => {
      const url = new URL(request.url, `${request.protocol}://${request.host}`);
      const body =
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : JSON.stringify(request.body ?? {});

      const response = await auth.handler(
        new Request(url, {
          method: request.method,
          headers: request.headers as HeadersInit,
          body,
        }),
      );

      response.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "set-cookie") {
          reply.header(key, value);
        }
      });

      const setCookies =
        (
          response.headers as Headers & {
            getSetCookie?: () => string[];
          }
        ).getSetCookie?.() ?? [];

      if (setCookies.length > 0) {
        reply.header("Set-Cookie", setCookies);
      }

      reply.status(response.status);

      if (response.body === null) {
        return reply.send();
      }

      return reply.send(await response.text());
    },
  });
}
