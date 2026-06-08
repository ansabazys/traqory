"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/auth-store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthStore();

  useAuth();

  if (isLoading) return null;

  return <>{children}</>;
};
