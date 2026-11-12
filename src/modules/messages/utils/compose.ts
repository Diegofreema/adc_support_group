import type { AudienceOption, Audience, Channel, ChapterAudience, SmsCost } from '../types'

/** People the choice reaches; "One chapter" counts the chosen chapter. */
export function recipientsFor(audiences: AudienceOption[], audience: Audience, chapter?: ChapterAudience): number {
  if (audience === 'chapter') return chapter?.count ?? 0
  return audiences.find((option) => option.value === audience)?.count ?? 0
}

/** The chapter option shows the chosen chapter's count. */
export function withChapterCount(audiences: AudienceOption[], chapter?: ChapterAudience): AudienceOption[] {
  return audiences.map((option) => (option.value === 'chapter' ? { ...option, count: chapter?.count ?? 0 } : option))
}

/** The SMS starts with the group's name ("Group: message"), and that is billed too. */
export function smsText(groupName: string | undefined, body: string): string {
  return groupName ? `${groupName}: ${body}` : body
}

/** Free channels always send; SMS needs enough points. */
export function needsPoints(channel: Channel, cost: SmsCost): boolean {
  return channel === 'sms' && !cost.enough
}

export function canSend(body: string, recipients: number): boolean {
  return body.trim().length > 0 && recipients > 0
}
