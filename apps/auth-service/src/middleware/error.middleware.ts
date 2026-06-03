import type { FastifyInstance } from "fastify";
import { APIError } from "better-auth";
import { ZodError } from "zod";

import { HttpError } from "../lib/http-error.js";

export async function errorMiddleware(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      request.log.warn({ issues: error.issues }, "Validation error");
      return reply.status(400).send({
        error: "Bad Request",
        message: "Validation failed",
        issues: error.issues,
      });
    }

    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send({
        error: error.name,
        message: error.message,
      });
    }

    if (error instanceof APIError) {
      return reply.status(error.statusCode).send({
        error: "Authentication Error",
        message: error.message,
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  });
}
