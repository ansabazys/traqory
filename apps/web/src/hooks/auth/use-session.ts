import { useQuery } from '@tanstack/react-query';

import { getSession, type SessionResponse } from '@/services/auth.service';

export function useSession() {
  return useQuery<SessionResponse>({
    queryKey: ['session'],
    queryFn: getSession,
  });
}
