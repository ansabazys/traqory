import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeApiKey } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ apiKeyId }: { apiKeyId: string; websiteId: string }) => revokeApiKey(apiKeyId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.apiKeys(variables.websiteId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.detail(variables.websiteId),
      });
    },
  });
}
