import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWebsite } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useUpdateWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ websiteId, data }: { websiteId: string; data: Parameters<typeof updateWebsite>[1] }) =>
      updateWebsite(websiteId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.detail(variables.websiteId),
      });
    },
  });
}
