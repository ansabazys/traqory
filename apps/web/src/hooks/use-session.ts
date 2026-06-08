import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/auth.service";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
}