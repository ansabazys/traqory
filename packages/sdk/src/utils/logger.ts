import { client } from "../client";

export function debug(
  ...args: unknown[]
): void {
  if (!client.isInitialized()) {
    return;
  }

  const config = client.getConfig();

  if (!config.debug) {
    return;
  }

  console.log(
    "[Traqory]",
    ...args
  );
}