import { z } from "zod";

export const createWebsiteSchema =
  z.object({
    name: z.string().min(2),

    domain: z.string().min(1),
  });

export type CreateWebsiteInput =
  z.infer<
    typeof createWebsiteSchema
  >;