/**
 * SMS pricing shared by leaders' messages and Directorate broadcasts.
 * Bunce pricing used across Rise Up: ₦1 = 1 point; one 160-character page to one person = 6 points.
 */
export const SMS_PAGE_CHARS = 160
export const POINTS_PER_SMS_PAGE = 6

/** Pages a message takes; at least 1 so the counter and cost never show 0. */
export function smsPages(text: string): number {
  return Math.max(1, Math.ceil(text.length / SMS_PAGE_CHARS))
}

/** Points to send `pages` pages to `recipients` people. */
export function smsPoints(recipients: number, pages: number): number {
  return recipients * pages * POINTS_PER_SMS_PAGE
}

/** Rough number of single-page SMS a points pack buys, rounded down to 10 ("About 16,660 SMS"). */
export function smsForPoints(points: number): number {
  return Math.floor(points / POINTS_PER_SMS_PAGE / 10) * 10
}
