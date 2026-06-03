import { z } from "zod";

export const updateProfilePayloadSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    image: z.string().url().nullable().optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one profile field is required",
  });

export const changePasswordPayloadSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: z.string().min(8).max(128),
  revokeOtherSessions: z.boolean().optional().default(true),
});

export const deleteUserPayloadSchema = z
  .object({
    password: z.string().min(1).max(128).optional(),
  })
  .default({});
