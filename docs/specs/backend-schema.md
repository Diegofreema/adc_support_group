# ADC Support Group: backend schema (draft)

Status: **draft, for review**. Nothing has been migrated yet.

ADC Support Group is a second frontend on Rise Up Naija's Supabase project (`oxmkdcykfbzkuqgjfujv`). Rise Up's existing Support Groups feature gets extended to carry ADC's richer model; ADC does not get its own tables. Migrations and edge functions are written in the **rise-up repo** (`/Users/mac/Desktop/personal/rise-up`), which owns the migration history. This repo only calls RPCs and edge functions.

Rise Up's current model is in `rise-up/docs/specs/support-groups.md` (decisions D1–D11).

## Decisions of record

| # | Decision | Why |
|---|---|---|
| A1 | Extend `support_groups*` rather than adding `adc_*` tables | One group system in one database; ADC is another frontend on the same backend |
| A2 | ADC users are ordinary `profiles`, tagged `source = 'adc_app'` (and `'adc_import'` for Excel/manual adds) | One account works in both apps; Rise Up dashboards can include or exclude them by `source` |
| A3 | ADC directorate = Rise Up staff: `require_active_staff()` for review work, `require_active_super_admin()` for money, settings and staff | No new role; matches Rise Up's admin-capabilities split |
| A4 | Everything Rise Up already has stays: phone auth edge functions, `notifications` + `createNotification()`, SMS points, broadcast queues, Funz shared code, storage helpers | Reuse before building |
| A5 | Existing Rise Up groups get `status = 'verified'` and keep working unchanged; every new column is nullable or defaulted | Rise Up's pages and RPCs must not break |
| A6 | Writes stay RPC-only (SECURITY DEFINER, `private.require_*`), SELECT-only RLS, member details only through leader/staff RPCs | Rise Up convention (D1 security block) |

## 1. Identity and sign-in

- **Profiles.** Add `'adc_app'` and `'adc_import'` to the `profiles.source` CHECK. ADC signups arrive as `role = 'volunteer'`, the same as Rise Up's phone signup.
- **Phone auth.** Reuse the `auth-phone-*` functions. Two changes:
  - An optional `app: 'adc'` field on signup and reset. It picks the OTP text ("ADC Support Group" instead of the hard-coded "Rise Up Naija"), sets `source`, and picks the site URL used in links.
  - Leader registration is signup plus group creation. The group is created after signup through `register_support_group` (below), not inside the auth function.
- **Imported members** (Excel or manual add) with no account: a `service_*` path creates the profile through the admin API. It sets `created_by_admin = true` and `must_change_password = true`, the same pattern as coordinator and candidate imports. Their first sign-in goes through OTP and a password reset. The import runs in an edge function, because it creates auth users.
- **Match against the ADC register.** On import, set `profiles.adc_member_id` when `phone_local` matches `adc_members`. That's an index lookup, and the NIN is never selected.

## 2. Groups: `support_groups` (extended)

New columns:

| Column | Type | Notes |
|---|---|---|
| `status` | new enum `support_group_status`: `pending`, `verified`, `rejected`, `suspended` | Default `'verified'` for the backfill. ADC registration inserts `'pending'` |
| `category_id` | FK to `support_group_categories` | Nullable for existing groups |
| `level` | new enum `support_group_level`: `national`, `state`, `lga`, `ward`, `abroad` | |
| `state`, `lga`, `ward`, `country`, `city` | text | Same text convention as `profiles`; compare with `norm_geo()` |
| `about` | text | |
| `photo_url` | text | Through `uploadPublicImage()` |
| `cac_number` | text | |
| `leader_title` | text | e.g. "Chairman" |
| `join_code` | text UNIQUE | 6 characters, for `/join/$code`. `slug` stays for Rise Up's links |
| `reviewed_by`, `reviewed_at`, `review_note` | | Directorate verification |
| `possible_duplicate_of` | uuid FK to `support_groups` | Set by a name and place check at registration |

New table `support_group_categories(id, name UNIQUE, is_active, sort)`. Staff can edit it; it's seeded from `GROUP_CATEGORIES`.

**Leaders.** `register_support_group(...)` lets a signed-in volunteer or coordinator with no group create a pending group. It also writes the `support_group_leaders` row itself, with `appointed_by = NULL` meaning self-registered. Rise Up's appoint flow is unchanged.

Compatibility changes to existing RPCs:
- `request_join_support_group`, `resolve_support_group` and `add_support_group_member` refuse groups that aren't `verified`.
- `get_my_support_group` also returns `status`.

Rise Up's pages ignore any field they don't know.

**Leadership handover** (`settings` → handovers in the design): new table `support_group_handovers(group_id, from_profile_id, to_profile_id, status pending|approved|declined, reviewed_by, …)`. Staff approve; the approve RPC swaps `leader_profile_id` and the leader rows in one transaction. This replaces Rise Up's v1 rule "no reassignment" (D10).

## 3. Chapters: `support_group_chapters` (new)

`id, group_id, name, level (state|lga|ward), state, lga, ward, coordinator_profile_id, join_code UNIQUE, created_at, updated_at`

- Leader writes go through RPCs. The coordinator is looked up by phone. If no profile exists, it's created as an import (§1).
- `member_count` and `activity_count` are computed in the read RPCs, not stored.

## 4. Memberships: `support_group_memberships` (extended)

New columns:

| Column | Notes |
|---|---|
| `chapter_id` | FK to chapters, nullable |
| `member_role` | new enum: `member`, `executive`, `coordinator` (default `member`) |
| `title` | Executive title (Secretary, Treasurer, PRO, Organiser, …) |
| `joined_via` | new enum: `link`, `excel`, `manual`, `request` (default `request` for the backfill) |

- Rise Up's rules stay: one active group per person, and the leader has no membership row (D9). ADC's roster shows the leader from `support_groups.leader_profile_id`.
- **ADC join by code** (`join_support_group_by_code(p_code)`) creates an active membership straight away, with `joined_via = 'link'`. A chapter code also sets `chapter_id`. Rise Up's request-and-approve flow is untouched.
- **Bulk add** (`import-support-group-members` edge function): validated rows go in, profiles are created or linked, and the result is reported per row.

## 5. Activities: `support_group_activities` (new)

This is separate from `support_group_member_activities`, which stays as Rise Up's members' self-log. ADC activities are group events with photos and a two-step review, modelled on Campus Fellowship's submit, review, approve flow.

`id, group_id, chapter_id, activity_type_id, title, occurred_on, people_reached, state, lga, ward, note, video_url, media_paths text[], status (pending|approved|rejected), logged_by, approved_by, approved_at, rejection_reason, checked_by, checked_at, created_at`

- New table `support_group_activity_types(id, slug, name, is_enabled, sort)`, seeded from `ACTIVITY_TYPES`. Staff can edit it.
- The review steps follow the design: recorded → approved by the leader → checked by the directorate. Staff can also reject.
- **Photos:** a new path prefix `support-groups/{group_id}/…` in the `activity-media` bucket. It gets a new insert policy that allows active members of that group, and goes through `uploadPublicImage()`.
- A link to a payment is optional (the payment row points at the activity, §6).

## 6. Payments and causes (new)

Nothing in Rise Up fits: `donations` is one general fund, with no purpose, no group link and no offline payments.

**`support_group_causes`:** `id, title, description, target_amount, deadline, status (open|closed), visibility (jsonb: all, categories or states), created_by, created_at`. Staff write it; the amount raised is computed.

**`support_group_payments`:**

| Column | Notes |
|---|---|
| `group_id`, `chapter_id`, `payer_profile_id`, `recorded_by` | |
| `cause_id` | Nullable. Set means the payment is for a cause |
| `purpose` | Enum `mobilisation, logistics, media, materials, other`, used when `cause_id` is null |
| `note`, `activity_id` | |
| `amount` | numeric naira, as `donations` stores it |
| `method` | `funz`, `transfer` or `cash` |
| `status` | `checking`, `paid`, `failed` or `rejected` |
| `reference` | `ADC-PAY-<hex>` for Funz, or the bank reference |
| `proof_path` | Private bucket `support-group-payment-proofs` |
| Funz fields | `provider_status, payment_url, verified_at, last_checked_at, check_count`, mirroring `donations` |
| Review | `reviewed_by, reviewed_at, rejection_reason` |

- **Online:** new edge functions `initiate-group-payment` and `verify-group-payment` reuse `_shared/funz.ts` and the settlement code. `reconcile-donations` also sweeps this table.
- **Offline:** the leader records the payment with proof as `checking`; staff mark it `paid` or `rejected` through an RPC.
- Receipts are built from the row. There is no new storage for them.

## 7. Messaging

- **Leader to members:**
  - The **App + Email** channel extends `send-group-message` with an audience (`all`, `chapter`, `executives`).
  - The **SMS** channel makes active verified-group leaders SMS-points holders. That means extending `private.sms_points_holder` and adding a `support_group` audience to `send-broadcast`, so points are charged and refunded by the existing ledger. Leaders buy points with the existing `buy-sms-points`.
- **Directorate broadcasts** (leaders or members, filtered by state, category or group): `send-broadcast` gets support group audiences. Staff send free, as they do today.
- **Notifications:** reuse type `'announcement'` with `metadata.group_id`, plus `metadata.app = 'adc'` so each app can filter its own. That needs no enum change (Rise Up's D7).

## 8. Directorate reads

These RPCs are staff-gated and state admins are scoped to their state through `require_staff_for_state()`:
- Dashboard stats.
- Group review queue, with duplicate hints.
- Activity check queue.
- Payments ledger and cause progress.
- Reports (counts by state, category and level).
- CSV export.

They extend Rise Up's `get_admin_support_group*` family; they don't fork it.

## Migration plan (rise-up repo)

New enum values each go in their own migration.

1. Enums, plus the `profiles.source` CHECK update.
2. Categories and activity-types tables with seeds.
3. `support_groups` columns, the backfill (`status = 'verified'`), `join_code` generation, and `support_group_chapters`.
4. Membership columns and `support_group_handovers`.
5. Activities, the storage policy, causes, payments and the proofs bucket.
6. RPCs: register, join by code, chapters, roster, activities, payments, staff reviews and reads. Patch the existing join and resolve RPCs for `status`.
7. Edge functions: `app: 'adc'` in auth, `import-support-group-members`, `initiate-` and `verify-group-payment`, the `send-group-message` audience, SMS points holders for leaders, and `send-broadcast` audiences. Deploy each one.
8. DB tests in `rise-up/tests/db` for every new RPC gate.

Then in this repo, swap each module's `*.service.ts` from mocks to RPCs, one module at a time, starting with auth.

## Settled 2026-11-12

| # | Decision |
|---|---|
| A7 | One group per person (Rise Up's rule stays) |
| A8 | Leaders of verified groups buy and spend their own SMS points (`private.sms_points_holder`) |
| A9 | Support Groups are removed from the Rise Up frontend; everything about support groups lives in ADC. Rise Up keeps the backend |

## Status

- **Database:** migrations `20261112000000`–`20261112000300` are **live**. `tests/db/adc-support-groups.test.ts` passes against the live database (rolled back).
- **Rise Up frontend:** the Support Group pages are removed. This is on rise-up branch `feat/adc-support-groups`, not committed yet.
- **Edge functions (live):**

| Function | What ADC sends | Notes |
|---|---|---|
| `auth-phone-signup-initiate` / `-complete` | `app: 'adc'`, plus `state`, `lga`, `ward`, `gender` on complete | ADC wording in the OTP. Profile is `source = 'adc_app'`, `status = 'active'` |
| `auth-phone-password-reset-initiate`, `auth-phone-change-password-initiate` | `app: 'adc'` | ADC wording in the OTP. Imported members get into their account through reset |
| `support-group-add-members` | `{ rows: [{ fullName, phone, email?, state?, lga?, ward?, chapterId? }], joinedVia: 'excel' \| 'manual' }` | At most 200 rows per call. Creates `adc_import` accounts and reports a result per row |
| `initiate-group-payment` | `{ amount, causeId? \| purpose?, note?, activityId? }` | Returns `payment_url`. Funz sends the payer back to `/payments/<id>?ref=<reference>` |
| `verify-group-payment` | `{ reference }` | Returns `checking`, `paid` or `failed`. `reconcile-donations` also settles group payments every 10 minutes |
| `adc-send-message` | `{ mode: 'group' \| 'broadcast', channel: 'free' \| 'sms', message, subject?, audience, chapterId?, state?, categoryId?, groupId? }` | Leaders pay for SMS in points; staff send free. Everyone gets an in-app notification |
| `buy-sms-points` | `app: 'adc'` | Returns to ADC `/messages?purchase=<ref>` |

- **Secrets to set** (needs a project owner; my account can't read or set secrets):
  - `ADC_SITE_URL`: the ADC app's public URL, used for payment returns and email links.
  - `ADC_RESEND_FROM_EMAIL` (optional): an ADC sender on a domain verified in Resend. Until it's set, ADC emails come from Rise Up's sender, with ADC wording in the body.
  - `ALLOWED_ORIGINS`: if this is set, the ADC origin must be added to it.
