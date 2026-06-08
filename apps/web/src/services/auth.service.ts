import { authApi } from "@/lib/api/client";


export interface LoginInput {
  email: string;
  password: string;
}

export async function login(
  data: LoginInput,
) {
  return authApi.post(
    "/auth/login",
    data,
  );
}

export async function register(
  data: {
    name: string;
    email: string;
    password: string;
  },
) {
  return authApi.post(
    "/auth/register",
    data,
  );
}

export async function me() {
  return authApi.get("/auth/me");
}