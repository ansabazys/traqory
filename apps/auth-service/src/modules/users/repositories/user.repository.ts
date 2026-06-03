import { eq } from "drizzle-orm";
import { db, user } from "@traqory/database";

import type { UpdateProfilePayload } from "../dto/user.dto.js";

export class UserRepository {
  async findById(userId: string) {
    const [record] = await db.select().from(user).where(eq(user.id, userId));
    return record ?? null;
  }

  async updateProfile(userId: string, payload: UpdateProfilePayload) {
    const [record] = await db
      .update(user)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning();

    return record ?? null;
  }
}

export const userRepository = new UserRepository();
