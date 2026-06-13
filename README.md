<div align="center">

# traqory

### Realtime Analytics Infrastructure

Track every event.
Understand every user.

<br />

<p>
  Modern web analytics platform for realtime event tracking, session analytics,
  traffic insights, and website performance monitoring.
</p>

<br />

<a href="https://traqory.vercel.app">
  <img src="https://img.shields.io/badge/Live-Demo-16a34a?style=for-the-badge" />
</a>
<a href="https://github.com/ansabazys/traqory">
  <img src="https://img.shields.io/badge/Open-Source-111111?style=for-the-badge" />
</a>

</div>

---

## Built for modern applications

Most analytics platforms tell you what happened.

Traqory helps you understand:

* Where users come from
* What actions they perform
* How sessions evolve
* Which pages drive engagement
* How traffic behaves globally
* What is happening right now

All in realtime.

---

## Dashboard

> Add your dashboard screenshot below

```md
![Traqory Dashboard](./docs/dashboard-preview.png)
```

---

## Features

### Realtime Analytics

Monitor visitors, sessions, events, and traffic as they happen.

### Event Tracking

Track custom events with a lightweight SDK.

```ts
track('signup');

track('checkout_completed', {
  value: 49,
  currency: 'USD',
});

track('subscription_upgraded');
```

### Session Analytics

Understand user journeys, engagement patterns, and session behavior.

### Global Traffic Map

Visualize traffic across countries and regions in realtime.

### Multi-Website Support

Manage multiple projects from a single dashboard.

### Developer Experience

Simple integration. Clean APIs. Modern tooling.

---

## Architecture

```txt
┌──────────────────┐
│   Traqory SDK    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Ingestion API  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Event Processor │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    PostgreSQL    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Analytics API  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Dashboard    │
└──────────────────┘
```

---

## Monorepo Structure

```txt
apps/
├── web
├── auth-service
├── ingestion-service
├── analytics-api
└── event-processor

packages/
├── database
├── sdk
├── ui
├── logger
├── config
└── types
```

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Motion

### Backend

* Fastify
* PostgreSQL
* Drizzle ORM

### Infrastructure

* Turborepo
* Docker
* Kubernetes
* Terraform

---

## Quick Start

Install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

---

## SDK Example

```ts
import { init, track } from '@traqory/sdk';

init({
  apiKey: 'YOUR_API_KEY',
});

track('page_view');

track('signup');

track('purchase', {
  amount: 99,
  currency: 'USD',
});
```

---

## Roadmap

### Completed

* Realtime Analytics
* Event Tracking
* Session Analytics
* Global Traffic Visualization
* Multi Website Management
* SDK Integration

### Planned

* Funnels
* User Journeys
* Team Workspaces
* Alerts & Notifications
* Data Export
* Custom Dashboards

---

## Why Traqory?

```txt
Fast.
Realtime.
Developer First.
Scalable.
Built for modern applications.
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open a pull request or start a discussion.

---

## License

MIT

---

<div align="center">

### Track every event.

### Understand every user.

</div>
