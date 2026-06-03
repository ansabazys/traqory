export { getVisitorId } from './core/visitor';
export { getSessionId } from './core/session';
export { identify } from "./features/identify";

import { client } from './client';
import type { SDKConfig } from './types';

export function init(config: SDKConfig) {
  client.init(config);
}
