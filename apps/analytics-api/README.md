# Traqory Analytics API

Website Management module for Traqory.

## Environment

```env
PORT=3002
HOST=0.0.0.0
DATABASE_URL=postgresql://...
AUTH_SERVICE_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000
```

## Auth

Every Website Management endpoint forwards the incoming `Cookie` header to:

```http
GET http://localhost:3001/api/auth/get-session
```

If Auth Service does not return a user, Analytics API returns `401 Unauthorized`.

## Endpoints

### Create Website

```http
POST /websites
Content-Type: application/json

{
  "name": "Traqory",
  "domain": "traqory.com"
}
```

```json
{
  "id": "8c287b7a-1a25-4d92-8b02-089f3ec91530",
  "name": "Traqory",
  "domain": "traqory.com",
  "slug": "traqory",
  "ownerId": "usr_123",
  "createdAt": "2026-06-03T00:00:00.000Z",
  "updatedAt": "2026-06-03T00:00:00.000Z"
}
```

### List Websites

```http
GET /websites
```

Returns only websites owned by the authenticated user.

### Get Website

```http
GET /websites/:id
```

Ownership is verified with `request.user.id`.

### Update Website

```http
PATCH /websites/:id
Content-Type: application/json

{
  "name": "Traqory App",
  "domain": "app.traqory.com"
}
```

### Delete Website

```http
DELETE /websites/:id
```

Deletes the website and cascades its API keys.

### Create API Key

```http
POST /websites/:id/api-keys
Content-Type: application/json

{}
```

```json
{
  "id": "4aa18a8a-4d32-42a4-8f83-f25d95c5f54a",
  "key": "trk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "websiteId": "8c287b7a-1a25-4d92-8b02-089f3ec91530",
  "createdAt": "2026-06-03T00:00:00.000Z",
  "lastUsedAt": null,
  "isActive": true
}
```

The key is returned once when created or rotated.

### List API Keys

```http
GET /websites/:id/api-keys
```

The raw key value is not returned.

### Revoke API Key

```http
DELETE /api-keys/:id
```

Sets `isActive = false`.

### Rotate API Key

```http
POST /api-keys/:id/rotate
```

Deactivates the old key and returns a new active key for the same website.
