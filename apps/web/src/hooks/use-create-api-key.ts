import { useMutation } from "@tanstack/react-query";

import { createApiKey } from "@/services/website.service";

export function useCreateApiKey() {
  return useMutation({
    mutationFn: createApiKey,
  });
}