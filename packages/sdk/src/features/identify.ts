import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../core/storage";

const USER_KEY = "traqory_user_id";

export function identify(userId: string): void {
  if (!userId) {
    throw new Error(
      "[Traqory] userId is required"
    );
  }

  setLocalStorage(USER_KEY, userId);
}

export function getUserId(): string | undefined {
  return getLocalStorage(USER_KEY) ?? undefined;
}

export function clearUserId(): void {
  removeLocalStorage(USER_KEY);
}