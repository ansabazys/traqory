# Traqory Database

Shared Drizzle/PostgreSQL package for the Traqory monorepo.

All PostgreSQL schema definitions live in `packages/database/src/schema`.
Services import `db` and table schemas from `@traqory/database`.

## Commands

Only this package should run Drizzle commands:

```sh
pnpm --filter @traqory/database db:generate
pnpm --filter @traqory/database db:migrate
pnpm --filter @traqory/database db:push
```

## Migration Strategy

`packages/database/drizzle.config.ts` loads every schema from:

```txt
./src/schema/**/*.ts
```

That gives Drizzle a single source of truth for Better Auth tables and analytics tables, so it does not treat tables from another service as drift to delete.

If an environment already has migrations applied from service-local folders, baseline carefully before applying this package's first combined migration.
