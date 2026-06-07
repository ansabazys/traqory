import { UAParser } from "ua-parser-js";

export function parseUserAgent(
  userAgent: string,
) {
  const parser = new UAParser(
    userAgent,
  );

  const browser =
    parser.getBrowser();

  const os = parser.getOS();

  const device =
    parser.getDevice();

  return {
    browser:
      browser.name ??
      "Unknown",

    browserVersion:
      browser.version ??
      null,

    os:
      os.name ??
      "Unknown",

    osVersion:
      os.version ??
      null,

    deviceType:
      device.type ??
      "desktop",
  };
}