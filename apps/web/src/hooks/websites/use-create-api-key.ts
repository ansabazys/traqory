import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiKey } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ websiteId, data }: { websiteId: string; data?: Parameters<typeof createApiKey>[1] }) =>
      createApiKey(websiteId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.apiKeys(variables.websiteId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.all,
      });
    },
  });
}
