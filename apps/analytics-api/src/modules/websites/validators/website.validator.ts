import { z } from "zod";

export const createWebsiteSchema = z.object({
  name: z.string().trim().min(1).max(120),
  domain: z.string().trim().min(3).max(253),
});

export const updateWebsiteSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    domain: z.string().trim().min(3).max(253).optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required",
  });

export const createApiKeySchema = z.object({}).default({});
