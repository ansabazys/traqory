import { useQuery } from "@tanstack/react-query";
import {
  getWebsites,
  type GetWebsitesFilters,
} from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useWebsites(
  filters?: GetWebsitesFilters,
) {
  return useQuery({
    queryKey: filters
      ? [...queryKeys.websites.all, filters]
      : queryKeys.websites.all,
    queryFn: () => getWebsites(filters),

    // refresh every 30s
    refetchInterval: 30_000,

    // refresh when tab regains focus
    refetchOnWindowFocus: true,
  });
}