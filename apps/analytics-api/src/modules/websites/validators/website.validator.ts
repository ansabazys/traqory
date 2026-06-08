import { z } from "zod";

export const createWebsiteSchema = z.object({
  name: z.string().trim().min(1).max(120),
  domain: z.string().trim().min(3).max(253),
  description: z.string().trim().max(500).optional(),
  environment: z.enum(["production", "staging", "development"]).default("production").optional(),
  timezone: z.string().trim().max(50).default("UTC").optional(),
});

export const updateWebsiteSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    domain: z.string().trim().min(3).max(253).optional(),
    description: z.string().trim().max(500).nullable().optional(),
    environment: z.enum(["production", "staging", "development"]).optional(),
    timezone: z.string().trim().max(50).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "ARCHIVED"]).optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required",
  });

export const createApiKeySchema = z.object({
  name: z.string().trim().min(1).max(120).default("Default Key"),
  expiresInDays: z.union([z.literal("never"), z.literal("30"), z.literal("90"), z.literal("180"), z.string()]).default("never").optional(),
  customExpiresAt: z.string().datetime().nullable().optional(),
});

export const listWebsitesSchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "ARCHIVED"]).optional(),
  environment: z.enum(["production", "staging", "development"]).optional(),
  sortBy: z.enum(["createdAt", "name", "domain"]).default("createdAt").optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
  page: z.preprocess((val) => (val ? parseInt(val as string, 10) : undefined), z.number().int().positive().optional()),
  limit: z.preprocess((val) => (val ? parseInt(val as string, 10) : undefined), z.number().int().positive().optional()),
});
