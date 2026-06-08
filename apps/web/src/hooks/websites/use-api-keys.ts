import { useQuery } from "@tanstack/react-query";
import { getApiKeys } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useApiKeys(
  websiteId?: string,
) {
  return useQuery({
    queryKey: websiteId
      ? queryKeys.websites.apiKeys(
          websiteId,
        )
      : ["websites", "apiKeys"],

    queryFn: () =>
      getApiKeys(websiteId!),

    enabled: !!websiteId,
  });
}