export function generateId(prefix: string) {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
}