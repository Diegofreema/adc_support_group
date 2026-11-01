import type { SmsCost } from '../types'

/** Bunce pricing used by Rise Up: ₦1 = 1 point; one 160-character page to one person = 6 points. */
export const SMS_PAGE_CHARS = 160
export const POINTS_PER_SMS_PAGE = 6

export function smsPages(text: string): number {
  return Math.max(1, Math.ceil(text.length / SMS_PAGE_CHARS))
}

export function smsPoints(recipients: number, pages: number): number {
  return recipients * pages * POINTS_PER_SMS_PAGE
}

/** Cost of sending `text` by SMS to `recipients`, against a points balance. */
export function smsCost(text: string, recipients: number, balance: number): SmsCost {
  const pages = smsPages(text)
  const points = smsPoints(recipients, pages)
  return { pages, points, enough: points <= balance, shortBy: Math.max(0, points - balance) }
}

/** How many single-page SMS a number of points buys. */
export function smsForPoints(points: number): number {
  return Math.floor(points / POINTS_PER_SMS_PAGE)
}
