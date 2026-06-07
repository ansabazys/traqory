export function getContext() {
  if (typeof window === "undefined") {
    return {
      language: undefined,
      timezone: undefined,
      screen: undefined,
    };
  }

  return {
    language: navigator.language,

    timezone:
      Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,

    screen: `${window.screen.width}x${window.screen.height}`,
  };
}