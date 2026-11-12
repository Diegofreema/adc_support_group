/**
 * SMS pricing shared by leaders' messages and Directorate broadcasts.
 * ₦1 = 1 point; each SMS page (segment) to one person = 6 points.
 *
 * Pages are counted exactly as the server bills them (Rise Up's
 * supabase/functions/_shared/sms-message.ts): GSM-7 fits 160 characters in
 * one page or 153 per page when longer; one character outside GSM-7 (a curly
 * quote, an emoji) switches the whole message to UCS-2 — 70, or 67 per page.
 */
export const SMS_PAGE_CHARS = 160
export const POINTS_PER_SMS_PAGE = 6

const GSM_BASIC =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?'
  + '¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà'
/** Escape sequences in GSM-7: two units each. */
const GSM_EXTENDED = '^{}\\[~]|€'

export interface SmsSize {
  encoding: 'GSM-7' | 'UCS-2'
  units: number
  pages: number
}

export function smsSize(text: string): SmsSize {
  let units = 0
  let ucs2 = false
  for (const character of [...text]) {
    if (GSM_EXTENDED.includes(character)) units += 2
    else if (GSM_BASIC.includes(character)) units += 1
    else {
      ucs2 = true
      units += character.length
    }
  }
  const [single, concat] = ucs2 ? [70, 67] : [160, 153]
  const pages = units === 0 ? 0 : units <= single ? 1 : Math.ceil(units / concat)
  return { encoding: ucs2 ? 'UCS-2' : 'GSM-7', units, pages }
}

/** Pages a message takes; at least 1 so the counter and cost never show 0. */
export function smsPages(text: string): number {
  return Math.max(1, smsSize(text).pages)
}

/** Points to send `pages` pages to `recipients` people. */
export function smsPoints(recipients: number, pages: number): number {
  return recipients * pages * POINTS_PER_SMS_PAGE
}

/** Rough number of single-page SMS a points pack buys, rounded down to 10 ("About 16,660 SMS"). */
export function smsForPoints(points: number): number {
  return Math.floor(points / POINTS_PER_SMS_PAGE / 10) * 10
}
