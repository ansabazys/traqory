import {
  removeLocalStorage,
  removeSessionStorage,
} from "../core/storage";

const VISITOR_KEY = "traqory_visitor_id";
const USER_KEY = "traqory_user_id";

const SESSION_KEY = "traqory_session_id";
const ACTIVITY_KEY = "traqory_last_activity";

export function reset(): void {
  removeLocalStorage(VISITOR_KEY);
  removeLocalStorage(USER_KEY);

  removeSessionStorage(SESSION_KEY);
  removeSessionStorage(ACTIVITY_KEY);
}