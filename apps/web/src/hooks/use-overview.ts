import { useQuery } from "@tanstack/react-query";

import { getOverview } from "@/services/analytics.service";

import { queryKeys } from "@/lib/query-keys";

export function useOverview(
  websiteId: string,
) {
  return useQuery({
    queryKey:
      queryKeys.analytics.overview(
        websiteId,
      ),

    queryFn: () =>
      getOverview(websiteId),

    enabled: !!websiteId,
  });
}