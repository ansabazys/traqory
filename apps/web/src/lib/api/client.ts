import { env } from "@/lib/env";
import { fetcher } from "./fetcher";

export const authApi = {
  get: <T>(path: string) =>
    fetcher<T>(
      `${env.NEXT_PUBLIC_AUTH_API_URL}${path}`,
    ),

  post: <T>(
    path: string,
    body: unknown,
  ) =>
    fetcher<T>(
      `${env.NEXT_PUBLIC_AUTH_API_URL}${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      },
    ),
};

export const analyticsApi = {
  get: <T>(path: string) =>
    fetcher<T>(
      `${env.NEXT_PUBLIC_ANALYTICS_API_URL}${path}`,
    ),
};