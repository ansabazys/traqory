import type { FastifyRequest } from "fastify";
import type { z } from "zod";

export function validateBody<TSchema extends z.ZodType>(
  request: FastifyRequest,
  schema: TSchema,
): z.infer<TSchema> {
  return schema.parse(request.body);
}
