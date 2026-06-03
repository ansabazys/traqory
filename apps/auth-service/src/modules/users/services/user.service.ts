import type { FastifyRequest } from "fastify";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../../../config/auth.js";
import { HttpError } from "../../../lib/http-error.js";
import type {
  ChangePasswordPayload,
  DeleteUserPayload,
  UpdateProfilePayload,
} from "../dto/user.dto.js";
import { userRepository } from "../repositories/user.repository.js";

export class UserService {
  async getMe(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  async updateMe(userId: string, payload: UpdateProfilePayload) {
    const user = await userRepository.updateProfile(userId, payload);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  async changePassword(request: FastifyRequest, payload: ChangePasswordPayload) {
    await auth.api.changePassword({
      headers: fromNodeHeaders(request.headers),
      body: payload,
    });

    return { success: true };
  }

  async deleteMe(request: FastifyRequest, payload: DeleteUserPayload) {
    await auth.api.deleteUser({
      headers: fromNodeHeaders(request.headers),
      body: payload,
    });

    return { success: true };
  }
}

export const userService = new UserService();
