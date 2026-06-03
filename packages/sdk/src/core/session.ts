import { generateId } from "../utils/uuid";

import {
  getSessionStorage,
  setSessionStorage,
} from "./storage";

const SESSION_KEY =
  "traqory_session_id";

const ACTIVITY_KEY =
  "traqory_last_activity";

const SESSION_TIMEOUT =
  30 * 60 * 1000; // 30 mins

function createSession() {
  const sessionId =
    generateId("session");

  const now = Date.now().toString();

  setSessionStorage(
    SESSION_KEY,
    sessionId
  );

  setSessionStorage(
    ACTIVITY_KEY,
    now
  );

  return sessionId;
}

export function getSessionId(): string {
  const sessionId =
    getSessionStorage(SESSION_KEY);

  const lastActivity =
    getSessionStorage(ACTIVITY_KEY);

  const now = Date.now();

  if (!sessionId || !lastActivity) {
    return createSession();
  }

  const inactiveTime =
    now - Number(lastActivity);

  if (inactiveTime > SESSION_TIMEOUT) {
    return createSession();
  }

  setSessionStorage(
    ACTIVITY_KEY,
    now.toString()
  );

  return sessionId;
}