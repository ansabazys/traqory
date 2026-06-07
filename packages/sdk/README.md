# @traqory/sdk

Lightweight, privacy-friendly web analytics SDK for Traqory.

Track page views, custom events, and user identities with automatic batching, offline recovery, UTM tracking, and browser context collection.

---

## Installation

```bash
npm install @traqory/sdk
```

```bash
pnpm add @traqory/sdk
```

```bash
yarn add @traqory/sdk
```

---

## Quick Start

```ts
import { init, track, pageview, identify } from '@traqory/sdk';

init({
  apiKey: 'pk_test_xxxxxxxxx',
  endpoint: 'https://ingest.traqory.com/events',
});

track('signup');
```

---

## Initialization

Initialize the SDK once when your application starts.

```ts
import { init } from '@traqory/sdk';

init({
  apiKey: 'pk_test_xxxxxxxxx',
  endpoint: 'https://ingest.traqory.com/events',

  batchSize: 10,
  flushInterval: 5000,

  autoPageview: true,
  debug: false,
});
```

### Configuration

| Option        | Type    | Required | Default |
| ------------- | ------- | -------- | ------- |
| apiKey        | string  | Yes      | -       |
| endpoint      | string  | Yes      | -       |
| batchSize     | number  | No       | 10      |
| flushInterval | number  | No       | 5000    |
| autoPageview  | boolean | No       | true    |
| debug         | boolean | No       | false   |

---

## Track Events

Track custom events with optional properties.

```ts
import { track } from '@traqory/sdk';

track('signup');
```

### Event Properties

```ts
track('purchase', {
  amount: 99,
  currency: 'USD',
  plan: 'pro',
});
```

---

## Page Views

Manual page view tracking:

```ts
import { pageview } from '@traqory/sdk';

pageview();
```

If `autoPageview` is enabled, page views are tracked automatically.

---

## Identify Users

Associate events with a known user.

```ts
import { identify } from '@traqory/sdk';

identify('user_123');
```

Subsequent events automatically include the user ID.

```ts
track('purchase');
```

---

## Automatic Context Collection

Traqory automatically collects:

```json
{
  "url": "https://example.com/pricing",
  "path": "/pricing",
  "referrer": "https://google.com",
  "title": "Pricing",

  "language": "en-US",
  "timezone": "Asia/Kolkata",
  "screen": "1920x1080"
}
```

No additional configuration is required.

---

## UTM Tracking

Traqory automatically captures marketing attribution parameters.

Example URL:

```text
https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer-sale
```

Captured values:

```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "summer-sale",
  "utm_term": "...",
  "utm_content": "..."
}
```

---

## Batching

Events are batched before being sent to the ingestion endpoint.

```ts
init({
  apiKey: '...',
  endpoint: '...',

  batchSize: 20,
  flushInterval: 10000,
});
```

Benefits:

- Reduced network requests
- Improved performance
- Better reliability

---

## Reliability Features

Traqory SDK includes:

- Event batching
- Configurable batch size
- Configurable flush interval
- navigator.sendBeacon support
- Page unload flushing
- Visibility change flushing
- Offline detection
- Automatic retry on reconnect
- LocalStorage queue persistence
- Queue restoration on startup

These features help prevent event loss during page navigation, refreshes, browser crashes, and temporary network failures.

---

## Example

```ts
import { init, track, identify } from '@traqory/sdk';

init({
  apiKey: 'pk_test_xxxxxxxxx',
  endpoint: 'https://ingest.traqory.com/events',
});

identify('user_123');

track('signup');

track('purchase', {
  amount: 99,
  currency: 'USD',
});
```

---

## API Reference

### init(config)

Initialize the SDK.

```ts
init({
  apiKey: '...',
  endpoint: '...',
});
```

### track(event, properties?)

Track a custom event.

```ts
track('button_clicked');

track('purchase', {
  amount: 99,
});
```

### pageview()

Track a page view.

```ts
pageview();
```

### identify(userId)

Associate future events with a user.

```ts
identify('user_123');
```

---

## Browser Support

Supported in all modern browsers that provide:

- fetch
- localStorage
- sessionStorage
- navigator.sendBeacon

---

## License

MIT
