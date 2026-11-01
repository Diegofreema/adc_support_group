/** Bunce SMS pricing used across Rise Up: ₦1 = 1 point, 6 points per SMS page. */
export const POINTS_PER_SMS_PAGE = 6
const SINGLE_PAGE = 160
const MULTI_PAGE = 153

/** 0 for empty text, 1 up to 160 chars, then 153 chars per page. */
export function smsPages(text: string): number {
  if (!text.length) return 0
  return text.length <= SINGLE_PAGE ? 1 : Math.ceil(text.length / MULTI_PAGE)
}

export function pointsNeeded(recipients: number, pages: number): number {
  return recipients * pages * POINTS_PER_SMS_PAGE
}

/** Rough number of SMS a pack buys (for "About 16,660 SMS"). */
export function smsForPoints(points: number): number {
  return Math.floor(points / POINTS_PER_SMS_PAGE / 10) * 10
}
