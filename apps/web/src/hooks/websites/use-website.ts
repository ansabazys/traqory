import { useQuery } from "@tanstack/react-query";
import { getWebsite } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useWebsite(websiteId: string) {
  return useQuery({
    queryKey: queryKeys.websites.detail(websiteId),
    queryFn: () => getWebsite(websiteId),
    enabled: !!websiteId,
  });
}
