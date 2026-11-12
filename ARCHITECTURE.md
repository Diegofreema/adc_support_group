# Frontend architecture

React 19 + TanStack Router (file routes) + TanStack Query + react-hook-form/zod. Styling: the "Ledger" design system (`src/styles/ledger.css`, ported from `design/`) plus Tailwind utilities mapped to the same tokens (`src/index.css`).

## Folders

```txt
src/
  routes/            Thin route files only: route config + render one page component.
  modules/<feature>/ Everything for one feature.
    components/      UI only. One job per component. No fetching, no business rules.
    hooks/           React glue: TanStack Query hooks, form hooks, view-model hooks.
    services/        Data access (Supabase RPCs, tables, edge functions). Pure async functions.
    types/           Feature types.
    utils/           Pure helpers: validation schemas, mapping, calculations.
    pages/           One page component per route; composes components + hooks.
  components/
    shared/          Reusable, feature-agnostic UI (Button, Card, ListItem, Field…).
    layout/          App shell, auth layout, action bar, split layouts.
  hooks/             Cross-feature hooks (useWizard, useDisclosure, useCopy).
  lib/               Cross-feature helpers (supabase, edge functions, format, toast, route guards, sms).
  config/            Static config (navigation per role).
  stores/            Global client state (session).
  services/          Cross-feature services (nav badges).
  types/domain.ts    Shared domain types.
```

## Rules

- A route file renders one page from its module. No logic in routes.
- Pages compose; components render. Data comes from hooks, never from services directly.
- Services never import React. Hooks never contain markup.
- Functions do one thing and stay short. Split anything that grows.
- Use `@/components/shared` before writing new UI. Add to it only when two modules need the same thing.
- Status is always icon + word (`StatusChip`). One primary (green) button per screen.
- Confirmations use `ConfirmDialog`, dialogs use `Modal`. Never `window.confirm/alert/prompt`.
- Modules don't import each other's internals. If two modules need the same data, the backend owns it; each module's service asks for what its screen needs.

## Data

The backend is Rise Up Naija's Supabase project, shared with Rise Up (see `docs/specs/backend-schema.md`). `.env` needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

- `src/lib/supabase.ts`: the client, plus `rpc()` for Postgres functions.
- `src/lib/edge-functions.ts`: `invokeFunction()` for edge functions. It always sends `app: 'adc'`, so SMS and emails say ADC and new accounts are tagged as ADC accounts.
- Services call one of those two. Hooks, pages and components never touch Supabase directly.

Every module reads and writes the live backend; there is no mock data left. Where the backend can't do something yet, the module's service says so in a comment instead of faking it.

## Session

Supabase persists the session. `bootstrapSession()` (auth module) runs before the first render and builds the app's `User` from `profiles` plus `get_my_support_group`:
- Rise Up staff (admin, super admin, state admin) are `directorate`.
- The leader of a group is `leader`.
- Everyone else is `member`.

Route guards read `sessionStore` synchronously. Call `refreshSessionUser()` after anything that changes who someone is in a group.

## Errors

A failed mutation shows its message in a toast (`MutationCache` in `src/lib/query-client.ts`). Forms that show the error inline set `meta: { inlineError: true }`.
