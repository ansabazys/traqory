import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

export async function errorHandlerPlugin(
  app: FastifyInstance,
) {
  app.setErrorHandler(
    (error, request, reply) => {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          code: "VALIDATION_ERROR",
          errors: error.issues,
        });
      }

      request.log.error(error);

      return reply.status(500).send({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
      });
    },
  );
}