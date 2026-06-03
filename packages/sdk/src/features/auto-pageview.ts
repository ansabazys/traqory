import { isBrowser } from "../utils/browser";
import { pageview } from "./pageview";

let initialized = false;
let lastUrl = "";

function triggerPageview(): void {
  const currentUrl = window.location.href;

  if (currentUrl === lastUrl) {
    return;
  }

  lastUrl = currentUrl;

  pageview();
}

export function setupAutoPageview(): void {
  if (!isBrowser || initialized) {
    return;
  }

  initialized = true;

  triggerPageview();

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (
    ...args: Parameters<History["pushState"]>
  ) {
    originalPushState.apply(this, args);

    triggerPageview();
  };

  history.replaceState = function (
    ...args: Parameters<History["replaceState"]>
  ) {
    originalReplaceState.apply(this, args);

    triggerPageview();
  };

  window.addEventListener("popstate", () => {
    triggerPageview();
  });
}