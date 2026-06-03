export const isBrowser =
  typeof window !== "undefined";

export const hasStorage =
  isBrowser &&
  typeof localStorage !== "undefined";