import type { BroadcastDraft } from '../types'

/** "Leaders · Lagos · Women", "Members · All states", "Leaders · Kano Keke Riders" */
export function audienceLabel(draft: Pick<BroadcastDraft, 'audience' | 'state' | 'group'>, categoryName?: string): string {
  const who = draft.audience === 'leaders' ? 'Leaders' : 'Members'
  if (draft.group.trim()) return `${who} · ${draft.group.trim()}`
  return [who, draft.state || 'All states', categoryName].filter(Boolean).join(' · ')
}
