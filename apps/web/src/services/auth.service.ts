import { authApi } from "@/lib/api/client";


export interface LoginInput {
  email: string;
  password: string;
}

export async function login(
  data: LoginInput,
) {
  return authApi.post(
    "/api/auth/sign-in/email",
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
    "/api/auth/sign-up/email",
    data,
  );
}

export async function getSession() {
  return authApi.get("/api/auth/get-session");
}