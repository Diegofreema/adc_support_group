# UX revamp plan

Goal: make the app easy for people who are not tech savvy. Every change applies the global UI/UX principles (motion principles + UX laws in `~/.claude/CLAUDE.md`). Work goes phase by phase; each phase is one reviewable change, checked in the browser at phone width before moving on.

Phase 0 matters most: the app already routes everything through shared components (`src/components/shared`) and one stylesheet (`src/styles/ledger.css`), so fixing those once improves all 50+ pages before any page work begins.

## Phase 0: Foundation (shared components and tokens)
Files: `src/styles/ledger.css`, `src/components/shared/**`, `src/components/layout/**`
- Motion tokens: `--dur-press` 100ms, `--dur-fast` 160ms, `--dur-base` 220ms, `--dur-slow` 360ms; `--ease-out`, `--ease-in`, `--ease-spring`. One global `prefers-reduced-motion` guard. *(Snappy timing, Slow in slow out, Follow through)*
- Button / IconButton: press scale, at least 48px tall, a spinner inside the button while it works, a pop when it succeeds. *(Squash & stretch, Anticipation, Doherty, Bigger hit areas)*
- Form fields (Field, TextInput, PhoneInput, AmountInput, OtpInput): large labels, ≥16px text, forgiving input that strips spaces, dashes and +country codes, a shake plus plain-words message on error. *(Postel, Exaggerated feedback)*
- Modal / ConfirmDialog: dimmed backdrop, enters with scale and fade from where it was triggered, exits faster than it enters. *(Staging, Pose to pose, Moving in arcs)*
- Toasts (AppToaster): success/error icons that animate, more contrast. *(Secondary action, Exaggerated feedback)*
- BottomNav / Sidebar: bigger tap targets, an active indicator that slides between tabs, a badge that bounces on change. *(Fitts, Jakob, Follow through)*
- EmptyState / ErrorState / Skeleton: friendly copy, one clear next action. *(Hick, Doherty)*
- Elevation scale: three consistent shadow levels from one light source. *(Solid drawing, Appeal)*
- Wizard: progress that animates per step, ≤5–7 fields per step. *(Miller)*

## Phase 1: First contact (auth and onboarding)
GetStartedPage, LoginPage, JoinPage, SetPasswordPage, RegisterGroupPage
- One primary action per screen; secondary options hidden behind a text link. *(Hick, Staging)*
- Phone-first login that accepts any number format. *(Postel)*
- Group registration split into short steps. *(Miller)*
- Drop helper text that only repeats the field label. *(Drop redundant labels)*

## Phase 2: Home (the most-used screens)
HomePage, MemberHomePage, LeaderHomePage, LeaderWaitingPage, SuspendedGroupPage
- The top 3–4 actions for each role go in big tiles within thumb reach. *(Frequency of use, Fitts)*
- Stats grouped into chunks; cards appear in a short stagger. *(Miller, Follow through)*

## Phase 3: Money and payments (high stakes, needs clear feedback)
MoneyPage, RecordIncome/Dues/Expense, DuesSettings, DuesStatus, PayPage, OfflinePaymentPage, ReceiptPage, PaymentsPage
- A big, forgiving AmountInput; a review step before anything is saved. *(Postel, Anticipation)*
- A strong success moment on payment or receipt (check draw, pop). *(Exaggerated feedback, Secondary action)*
- Optimistic list updates. *(Doherty)*

## Phase 4: Events and activities
EventsPage, EventDetail, NewEvent, EditEvent, RecordEvent, Attendance, Checkin, ActivitiesPage, ActivityDetail, RecordActivity, EditActivity
- Check-in and attendance get very large tap targets and instant toggles. *(Fitts, Doherty)*
- Create/edit forms split into steps; photo picking made simpler.

## Phase 5: People and communication
MembersPage, AddMembers, ImportMembers, MessagesPage, NotificationsPage, LeaderboardPage, GroupPage, ChaptersPage, ChapterPage
- Search and filters with few choices; list items with large rows. *(Hick, Bigger hit areas)*
- Import shown as a guided flow with a clear preview and error rows.

## Phase 6: Profile and More
ProfilePage, MorePage, VotingAreaPage
- Settings grouped into small sets of related items, with familiar icons. *(Miller, Jakob)*

## Phase 7: Directorate (admin)
Dashboard, Strength, Reports, GroupReview, Groups, ActivityReview, Broadcasts, Payments, Causes, Settings, More
- Same patterns, tuned for denser data: tables that become cards on phones, review actions (approve/reject) as large, distinct buttons with a confirm step. *(Staging, Exaggerated feedback)*

## Phase 8: Plain-language error messages (after Phase 7)
Server errors currently reach people word for word: `src/lib/supabase.ts` throws `error.message` as-is, and edge-function errors do the same. During Phase 4 testing a refused attendance save showed the database's raw text (internal names with underscores).
- One translator between the server and the screen (`lib/supabase.ts` and `lib/edge-functions.ts`). It turns known database, auth, network and edge-function errors into plain English that says what happened and what to do next ("You don't have permission to do that. Ask your group leader.", "No connection. Check your data and try again.", "You were logged out. Please log in again.").
- Never show internal names, codes, SQL, stack traces or anything with underscores. Never reveal security details (which check failed, whether an account exists).
- Keep messages the backend already writes in plain English (e.g. "This event is closed").
- Unknown errors fall back to "Something went wrong. Please try again." The raw message is kept only in the console for debugging.
- Sweep every `notify(error.message)` / `error.message` shown in the UI, and check the edge functions' own messages in the Rise Up repo.

### Error log (raw messages seen while testing; fix each in Phase 8)
Logged as each phase is tested. "Where" is the screen it showed on, "Seen as" is the exact text a person saw.

| # | Phase | Where | Seen as | Comes from | Plain-English version |
|---|---|---|---|---|---|
| 1 | 4 | Attendance, ticking a person | Raw database text from the refused save (permission error naming the attendance function) | `useMarkPresent` → `lib/supabase.ts` throws `error.message` | "Couldn't save that tick. Check your connection and try again." (or a permission line if not allowed) |
| 2 | 5 | Members list | "permission denied for function get_support_group_roster" | `fetchMemberPage` → `ErrorState` shows `error.message` | "We couldn't load your members. Please try again." |
| 3 | 5 | Leaderboard | "permission denied for function get_support_group_leaderboard" | `fetchBoard` → `ErrorState` shows `error.message` | "We couldn't load the leaderboard. Please try again." |
| 5 | 6 | Home (any page whose data fails to load) | "Something went wrong loading this page. Check your connection and try again." even when the real cause was a refused login/permission, not the connection | `RouteError`: any error `error-kind.ts` can't classify (`unknown`) gets the "check your connection" helper | Pick the message by cause: no connection / logged out / not allowed / something else |
| 6 | 7 | Directorate overview and Strength | Red banner "Could not load the overview" / "Could not load strength" with the raw server text underneath | `DashboardPage` and `StrengthPage` render `{error.message}` inside the banner | Same banner, plain helper line + Try again button |
| 7 | 7 | Group review (Directorate) | "permission denied for function get_admin_sg_group_review" | `useGroup` → `ErrorState` shows `error.message` | "We couldn't load this group. Please try again." |
| 8 | 7 | Directorate lists: Groups, Activities, Payments, Causes, Settings | **No error at all.** A failed load shows the empty state ("No groups waiting to be verified", "Nothing to confirm", "No causes"), so staff think there is nothing to do | `use-group-list`, `use-payments`, `use-causes`, `use-settings`, activity list hook: `query.data ?? []` and the query's `error` is never returned or shown | Show an error state with Try again when the load fails; only show "nothing waiting" when the server really returned none |
| 4 | 2–5 | Background calls on every screen | HTTP 401 responses (console only, not on screen) | Requests made without a signed-in session | Session expired → "You were logged out. Please log in again." and send to login |

**Status: all 8 fixed in Phase 8** and re-tested in the browser against the live backend (each screen now shows a plain message and, where it makes sense, Try again). How:
- `src/lib/errors.ts`: one translator (`friendlyError`, `errorCause`). Sorts by cause (no connection, logged out, not allowed, not found, already exists, invalid, too many tries, timeout, server); lets the backend's own plain sentences through; blocks anything with underscores, codes, SQL or raw database phrases.
- Applied where text reaches people: every error toast (`lib/toast.ts`, `lib/query-client.ts`), every `ErrorState`, page errors (`RouteError`/`error-kind.ts`: logged out → Log in again, not allowed → Go to home), and the form/banner messages in login, join, profile, events, group edit, register, Directorate overview and Strength.
- `lib/supabase.ts` now keeps the server's code and status on thrown errors, so causes are read from codes, not just wording.
- Lists that showed failures as empty now show an error with Try again (`src/hooks/load-failure.ts`): Directorate groups, activities, payments, causes, all settings sections; member payment history, chapters, notifications, sent messages.

Pattern behind all of them: `ErrorState` prints `error.message` under its title, and mutation errors go to a toast as-is (`lib/query-client.ts`). Fixing the translator in one place covers every row above.

## Per-phase checklist
- [ ] Tap targets ≥48px; body text ≥16px; contrast AA
- [ ] Each screen has one obvious primary action
- [ ] Loading, empty and error states all present and in plain language
- [ ] Motion uses tokens only; reduced-motion respected
- [ ] Verified at 375px and desktop, light and dark
