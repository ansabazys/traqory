export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  websites: {
    all: ["websites"] as const,

    detail: (id: string) =>
      ["websites", id] as const,

    apiKeys: (websiteId: string) =>
      ["websites", websiteId, "apiKeys"] as const,
  },

  analytics: {
    overview: (
      websiteId: string,
    ) =>
      [
        "analytics",
        websiteId,
        "overview",
      ] as const,

    events: (
      websiteId: string,
    ) =>
      [
        "analytics",
        websiteId,
        "events",
      ] as const,
  },
};