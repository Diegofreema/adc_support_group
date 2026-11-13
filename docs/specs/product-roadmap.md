# ADC Support Group: product roadmap

Agreed with the product owner on 2026-11-12, after an audit of the app. The goal is an app that works the way a presidential support group actually works, is very easy to use, and keeps a full record of every group's activity.

## Who it's for

- **Members** are a mix, many on cheap Android phones with patchy data and limited English. A member's job takes a few taps. The leader, an executive or a coordinator can do anything on a member's behalf, and the record always says who did it ("recorded by the Secretary").
- **Language** is picked on the first screen of a join link: English, Pidgin, Hausa, Yoruba or Igbo. The choice is remembered, can be changed in the profile, and SMS use it too. Member screens are translated; leader and Directorate screens stay in English for now. Claude drafts each translation and a native speaker reviews it before that language is turned on.

## How messages leave the app

- **Email first.** When the app contacts someone, it uses email if they have one and SMS if they don't. The one exception is when the sender deliberately picks SMS: a leader's message or a Directorate broadcast.
- **Codes:**
  - Sign-up codes always go by SMS, because they prove the phone number is theirs.
  - Reset and change-password codes go to whichever of email or SMS the account has. When it has both, the person chooses.
- **Automatic messages:** only important ones go out by email (or SMS if there's no email): added to a group, group verified, rejected or asked for more information, leadership handover, and event reminders. Everything else stays in-app.
  - The Directorate pays for these SMS from a monthly budget set in Settings.
  - When the budget runs out, these messages stay in-app and staff see a warning.
  - Event reminder SMS only go to people who said they'd come.
- **Imported members** are welcomed by email if they have one. Otherwise they get an SMS paid from the leader's points, or, when the leader has no points, the leader gets a free WhatsApp share list or a printable sheet. The link opens "set your password with your code", in the person's language.

## Groups and roles

- **Pending group:** inviting, adding members, paying and messaging are locked. The leader sees a "Waiting for the Directorate" page with the progress so far, the reason if rejected, a reply box for "ask for more info", and edit and resubmit.
- **Executives** start from their title's powers, and the leader can tick extra powers for each one:
  - Secretary: members and approvals.
  - Treasurer: money.
  - PRO: messages.
  - Organiser: events.
- **Coordinators** have the same powers, limited to their own chapter.
- **Leave group** happens straight away, and the member's history stays with the group.
- **Delete my details:**
  - It has a 7-day wait in which the person can cancel.
  - After that, their name, phone and email are wiped and they show as "Former member".
  - Their activities and money stay counted.
  - The Directorate sees a log of who left and who asked for deletion.
- **Nothing is ever deleted.** Removed or rejected records stay, with who did it and why. Leader actions go into the history the same way staff actions do.

## Activities and events

- **Proof:** an activity needs at least one photo. The phone's location is captured silently when it's available.
- **Editing:** an activity can be edited and resubmitted while it's waiting or sent back, and every version is kept. Once approved it's locked; after that only the Directorate can reject it, and only with a reason.
- **Events:**
  - Who creates them: the leader, executives, or a coordinator for their own chapter.
  - Who they're for: the whole group or one chapter. Everyone in the group can see them and tap "I'll come".
  - Attendance: the organiser ticks names, and that list is the record. A QR code at the venue lets members check themselves in.
  - Afterwards: one tap turns the event into an activity, with the headcount taken from attendance and a prompt for photos.

## Money

- **Dues** are off until the treasurer turns them on and sets the amount and how often.
  - Members pay outside the app, and the treasurer records each payment with proof.
  - Members see whether they've paid.
  - Only the treasurer and the leader see who hasn't paid, and there are no penalties.
- **Expenses** are reported with receipts. Members see totals for money in, money out and the balance; executives see the details.
- **Giving limit:** each person's running total to campaign causes is tracked against a limit the Directorate sets. Going past it shows the payer a warning and flags it for staff. It never blocks the payment.

## Motivation

- **Leaderboard:** groups are ranked within their state and their category by activities approved and people reached in the last 30 days, refreshed daily. Money is never used to rank.
- **"Active member" badge:** earned by attending 3 events or having 2 activities approved in the last 60 days. It drops off quietly, and nobody sees a "not active" label.

## Not in scope

- Election-day features (agents, results).

## Voting areas (added 2026-11)

- Every member picks the polling unit where they vote, once, before using the app (staff excepted). It is checked against the INEC list (`set_my_voting_area`) and can be changed on the profile.
- The Directorate sees support by polling unit: strongest and weakest units, members per 1,000 registered voters, and a map.

## Phases

Each phase ships and is usable on its own.

1. **Fixes and first impressions:**
   - Audit bugs:
     - Broken join links and QR codes.
     - Pages that spin forever when loading fails, and the crash when someone has no group.
     - Join details that are collected and then thrown away.
     - The group photo that is never uploaded.
     - "Removed from group" notices that never show.
     - A removed coordinator who still appears on their chapter.
     - The wrong member count for "One chapter".
     - Offline payments pushed out of the Directorate's queue.
     - Buttons that do nothing.
   - The waiting page for pending groups.
   - The welcome for imported members.
   - The email-first rule.
   - Choice of channel for codes.
   - Delivery of important messages, with the Directorate SMS budget.
2. **Trust and low data:**
   - Executive powers.
   - Acting on a member's behalf.
   - Activity edit and resubmit, with history.
   - The photo and location proof rule.
   - Recording leader actions.
   - Leave group, and delete my details.
   - Smaller photos and thumbnails.
   - Offline drafts that send when the signal returns.
3. **Events:** "I'll come", attendance, QR check-in, turning an event into an activity, and reminders.
4. **Money:** dues, expenses, the members' money summary, and the giving limit.
5. **Motivation:** leaderboard and badges.
6. **Languages:** the language switch, plus drafted translations for review.
