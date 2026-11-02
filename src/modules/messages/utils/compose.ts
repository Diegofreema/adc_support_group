import type { AudienceOption, Audience, Channel, SmsCost } from '../types'

export function recipientsFor(audiences: AudienceOption[], audience: Audience): number {
  return audiences.find((option) => option.value === audience)?.count ?? 0
}

/** Free channels always send; SMS needs enough points. */
export function needsPoints(channel: Channel, cost: SmsCost): boolean {
  return channel === 'sms' && !cost.enough
}

export function canSend(body: string, recipients: number): boolean {
  return body.trim().length > 0 && recipients > 0
}
