import { useQuery } from "@tanstack/react-query";
import { getOverview } from "@/services/analytics.service";
import { queryKeys } from "@/lib/query-keys";

export function useWebsiteAnalytics(websiteId?: string) {
  return useQuery({
    queryKey: websiteId ? queryKeys.analytics.overview(websiteId) : ["analytics", "overview"],
    queryFn: () => getOverview(websiteId!),
    enabled: !!websiteId,
  });
}
