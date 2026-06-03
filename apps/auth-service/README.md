# Traqory Auth Service

Production authentication microservice for Traqory using Fastify, Better Auth, Drizzle ORM, PostgreSQL, and Zod.

## Environment

```env
PORT=3001
HOST=0.0.0.0
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=replace-with-at-least-32-characters
BETTER_AUTH_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000
```

## Commands

```sh
pnpm dev
pnpm build
pnpm typecheck
```

Database schemas and migrations are owned by `@traqory/database`.
Run migration commands from `packages/database`, not from this service.

## Health

```http
GET /health
```

```json
{
  "status": "ok",
  "service": "auth-service"
}
```

## Better Auth Endpoints

```http
POST /api/auth/sign-up/email
POST /api/auth/sign-in/email
POST /api/auth/sign-out
GET  /api/auth/get-session
```

Example sign up:

```http
POST /api/auth/sign-up/email
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

Example sign in:

```http
POST /api/auth/sign-in/email
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}
```

## User Endpoints

All user endpoints require the Better Auth session cookie.

```http
GET /api/users/me
```

```json
{
  "id": "user_id",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "emailVerified": false,
  "image": null,
  "createdAt": "2026-06-03T00:00:00.000Z",
  "updatedAt": "2026-06-03T00:00:00.000Z"
}
```

```http
PATCH /api/users/me
Content-Type: application/json

{
  "name": "Jane Q. Doe",
  "image": "https://example.com/avatar.png"
}
```

```http
PATCH /api/users/change-password
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newPassword123",
  "revokeOtherSessions": true
}
```

```json
{
  "success": true
}
```

```http
DELETE /api/users/me
Content-Type: application/json

{
  "password": "newPassword123"
}
```

```json
{
  "success": true
}
```
