# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Japan Trip Planner (`artifacts/japan-trip`)

Family voting app for the De Decker Japan trip (July 27 – Aug 13, 2026). 5 members: Olivier, Katja, Alix, Chloé, Maxime.

### Features
- Dark UI (bg `#16162a`, gold `#c8a84b`)
- Home: 7-day weekly grid (3 rows: 7+7+4), leaderboard of most-voted activities
- DayDetail: info table (Ville/Repas/Transport/Hébergement) + activities table with 3-state voting
- Voting: **up / neutral / down** per person per activity
- Votes persisted in PostgreSQL via REST API (`/api/votes`)
- Vite dev server proxies `/api` → `http://localhost:8080`

### DB schema
`votes` table: `id, voter, day_number, activity_index, vote_type, created_at, updated_at`
Unique constraint on `(voter, day_number, activity_index)`.

### API routes
- `GET /api/votes` — all votes
- `PUT /api/votes/:voter/:dayNumber/:activityIndex` — cast/update vote
- `DELETE /api/votes/:voter/:dayNumber/:activityIndex` — remove vote

### Known caveat
`lib/api-zod/src/index.ts` exports only from `./generated/api` (not `./generated/types`) to avoid a naming collision between the Orval-generated Zod body schema and the TypeScript type with the same name.
