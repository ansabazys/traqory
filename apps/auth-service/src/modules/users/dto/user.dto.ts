import type { z } from "zod";

import type {
  changePasswordPayloadSchema,
  deleteUserPayloadSchema,
  updateProfilePayloadSchema,
} from "../validators/user.validator.js";

export type UpdateProfilePayload = z.infer<typeof updateProfilePayloadSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;
export type DeleteUserPayload = z.infer<typeof deleteUserPayloadSchema>;
