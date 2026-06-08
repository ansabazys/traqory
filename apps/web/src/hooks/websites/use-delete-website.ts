import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWebsite } from "@/services/website.service";
import { queryKeys } from "@/lib/query-keys";

export function useDeleteWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.websites.all,
      });
    },
  });
}
