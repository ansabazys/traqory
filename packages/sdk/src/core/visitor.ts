import { generateId } from "../utils/uuid";
import {
  getLocalStorage,
  setLocalStorage,
} from "./storage";

const VISITOR_KEY =
  "traqory_visitor_id";

export function getVisitorId(): string {
  let visitorId =
    getLocalStorage(VISITOR_KEY);

  if (!visitorId) {
    visitorId =
      generateId("visitor");

    setLocalStorage(
      VISITOR_KEY,
      visitorId
    );
  }

  return visitorId;
}