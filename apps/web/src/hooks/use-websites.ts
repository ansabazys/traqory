import { useQuery } from "@tanstack/react-query";

import { getWebsites } from "@/services/website.service";

import { queryKeys } from "@/lib/query-keys";

export function useWebsites() {
  return useQuery({
    queryKey: queryKeys.websites.all,
    queryFn: getWebsites,
  });
}