import { auth } from "../../../config/auth.js";

export class AuthService {
  getSession(headers: Headers) {
    return auth.api.getSession({ headers });
  }
}

export const authService = new AuthService();
