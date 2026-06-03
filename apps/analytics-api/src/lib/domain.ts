import { HttpError } from "./http-error.js";

const domainPattern =
  /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;

export function normalizeDomain(value: string) {
  const input = value.trim().toLowerCase();

  if (!input) {
    throw new HttpError(400, "Domain is required");
  }

  const withProtocol = /^https?:\/\//.test(input)
    ? input
    : `https://${input}`;

  let hostname: string;

  try {
    hostname = new URL(withProtocol).hostname.replace(/^www\./, "");
  } catch {
    throw new HttpError(400, "Domain must be a valid hostname");
  }

  if (!domainPattern.test(hostname)) {
    throw new HttpError(400, "Domain must be a valid public domain");
  }

  return hostname;
}
