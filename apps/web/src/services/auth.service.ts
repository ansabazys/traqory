import { authApi } from "@/lib/api/client";


export interface LoginInput {
  email: string;
  password: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionResponse {
  session: Session;
  user: SessionUser;
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

export async function getSession(): Promise<SessionResponse> {
  return authApi.get<SessionResponse>(
    "/api/auth/get-session",
  );
}
export function logout() {
  return authApi.post(
    "/api/auth/sign-out",
    {},
  );
}