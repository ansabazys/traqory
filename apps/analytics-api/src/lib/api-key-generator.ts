import { randomBytes } from "node:crypto";

export function generateTrackingKey() {
  return `trk_${randomBytes(24).toString("base64url")}`;
}
