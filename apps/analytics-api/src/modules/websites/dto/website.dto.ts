import type { z } from "zod";

import type {
  createApiKeySchema,
  createWebsiteSchema,
  updateWebsiteSchema,
} from "../validators/website.validator.js";

export type CreateWebsiteDto = z.infer<typeof createWebsiteSchema>;
export type UpdateWebsiteDto = z.infer<typeof updateWebsiteSchema>;
export type CreateApiKeyDto = z.infer<typeof createApiKeySchema>;
