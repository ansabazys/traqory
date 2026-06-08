import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rotateApiKey } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useRotateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ apiKeyId }: { apiKeyId: string; websiteId: string }) => rotateApiKey(apiKeyId),
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
