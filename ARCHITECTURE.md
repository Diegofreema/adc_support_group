# Frontend architecture

React 19 + TanStack Router (file routes) + TanStack Query + react-hook-form/zod. Styling: the "Ledger" design system (`src/styles/ledger.css`, ported from `design/`) plus Tailwind utilities mapped to the same tokens (`src/index.css`).

## Folders

```txt
src/
  routes/            Thin route files only: route config + render one page component.
  modules/<feature>/ Everything for one feature.
    components/      UI only. One job per component. No fetching, no business rules.
    hooks/           React glue: TanStack Query hooks, form hooks, view-model hooks.
    services/        Data access (mock today, Supabase later). Pure async functions.
    types/           Feature types.
    utils/           Pure helpers: validation schemas, mapping, calculations.
    pages/           One page component per route; composes components + hooks.
  components/
    shared/          Reusable, feature-agnostic UI (Button, Card, ListItem, Field…).
    layout/          App shell, auth layout, action bar, split layouts.
  hooks/             Cross-feature hooks (useWizard, useDisclosure, useCopy).
  lib/               Cross-feature helpers (format, toast, route guards, mock-api).
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

All services use `src/lib/mock-api.ts` (`respond`, `delay`) and in-module `*.mock.ts` seed data. Swapping to Supabase means changing service files only; hooks, pages and components stay the same.

## Demo logins (any password, 4+ characters)

| Role | Phone |
|---|---|
| Group leader | 0803 555 0142 |
| Member | 0802 334 7781 |
| Directorate (super admin) | 0809 000 0001 |
