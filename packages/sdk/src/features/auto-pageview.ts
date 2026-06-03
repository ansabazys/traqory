import { isBrowser } from "../utils/browser";
import { pageview } from "./pageview";

let initialized = false;

export function setupAutoPageview(): void {
  if (!isBrowser || initialized) {
    return;
  }

  initialized = true;

  pageview();

  const originalPushState =
    history.pushState;

  const originalReplaceState =
    history.replaceState;

  history.pushState = function (
    ...args
  ) {
    originalPushState.apply(this, args);

    pageview();
  };

  history.replaceState = function (
    ...args
  ) {
    originalReplaceState.apply(this, args);

    pageview();
  };

  window.addEventListener(
    "popstate",
    () => {
      pageview();
    }
  );
}