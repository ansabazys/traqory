import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWebsite } from "@/services/website.service";

import { queryKeys } from "@/lib/query-keys";

export function useCreateWebsite() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createWebsite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.websites.all,
      });
    },
  });
}