import { useQuery } from "@tanstack/react-query";

import { getOverview } from "@/services/analytics.service";

export function useOverview(
  websiteId?: string,
) {
  return useQuery({
    queryKey: [
      "overview",
      websiteId,
    ],
    queryFn: () =>
      getOverview(websiteId!),
    enabled: !!websiteId,
  });
}