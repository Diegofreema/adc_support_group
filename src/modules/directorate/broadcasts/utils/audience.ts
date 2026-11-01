import { ALL } from '../../shared/constants/options'
import type { BroadcastDraft } from '../types'

/** Mock audience sizes; the real backend counts recipients for the chosen filters. */
const BASE = { leaders: 4812, members: 1_180_000 }
const STATE_SHARE: Record<string, number> = { Kano: 0.065, Lagos: 0.071, FCT: 0.034 }
const CATEGORY_SHARE = 0.2

export function recipientCount(draft: Pick<BroadcastDraft, 'audience' | 'state' | 'category' | 'group'>): number {
  if (draft.group.trim()) return draft.audience === 'leaders' ? 1 : 3482
  const stateShare = draft.state === ALL ? 1 : (STATE_SHARE[draft.state] ?? 0.03)
  const categoryShare = draft.category === ALL ? 1 : CATEGORY_SHARE
  return Math.max(1, Math.round(BASE[draft.audience] * stateShare * categoryShare))
}

/** "Lagos · Women", "All states" */
export function placeLabel(draft: Pick<BroadcastDraft, 'state' | 'category' | 'group'>): string {
  if (draft.group.trim()) return draft.group.trim()
  return [draft.state || 'All states', draft.category].filter(Boolean).join(' · ')
}
