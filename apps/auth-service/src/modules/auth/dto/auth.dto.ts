import type { z } from "zod";

import type {
  loginPayloadSchema,
  registerPayloadSchema,
} from "../validators/auth.validator.js";

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
