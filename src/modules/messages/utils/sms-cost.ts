import { smsPages, smsPoints } from '@/lib/sms'
import type { SmsCost } from '../types'

/** Cost of sending `text` by SMS to `recipients`, against a points balance. */
export function smsCost(text: string, recipients: number, balance: number): SmsCost {
  const pages = smsPages(text)
  const points = smsPoints(recipients, pages)
  return { pages, points, enough: points <= balance, shortBy: Math.max(0, points - balance) }
}
