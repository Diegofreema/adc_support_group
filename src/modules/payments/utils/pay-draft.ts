import type { KeyValue } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import type { Cause } from '@/types/domain'
import type { ActivityOption, ChapterOption, PayDraft } from '../types'
import { purposeLabel } from './purposes'

export const EMPTY_DRAFT: PayDraft = { payFor: 'cause', purpose: 'mobilisation', note: '', payer: 'group', amount: 250_000 }

export interface DraftLookups {
  groupName: string
  causes: Cause[]
  chapters: ChapterOption[]
  activities: ActivityOption[]
}

function nameOf<T extends { id: string }>(items: T[], id: string | undefined, pick: (item: T) => string): string | undefined {
  const item = items.find((candidate) => candidate.id === id)
  return item ? pick(item) : undefined
}

export function draftForLabel(draft: PayDraft, causes: Cause[]): string {
  if (draft.payFor === 'general') return purposeLabel(draft.purpose)
  return nameOf(causes, draft.causeId, (cause) => cause.title) ?? '—'
}

export function draftPayerLabel(draft: PayDraft, lookups: DraftLookups): string {
  if (draft.payer === 'group') return lookups.groupName
  return `${nameOf(lookups.chapters, draft.chapterId, (chapter) => chapter.name) ?? '—'} chapter`
}

/** Rows for the "Check" step. */
export function payDraftSummary(draft: PayDraft, lookups: DraftLookups): KeyValue[] {
  return [
    { label: 'For', value: draftForLabel(draft, lookups.causes) },
    { label: 'Paid by', value: draftPayerLabel(draft, lookups) },
    { label: 'Amount', value: formatNaira(draft.amount) },
    { label: 'Activity', value: nameOf(lookups.activities, draft.activityId, (activity) => activity.title) ?? 'None' },
  ]
}

/** Can the user leave this step? Steps: 0 for, 1 who, 2 amount, 3 check. */
export function isStepComplete(draft: PayDraft, step: number): boolean {
  if (step === 0) return draft.payFor === 'general' || Boolean(draft.causeId)
  if (step === 1) return draft.payer === 'group' || Boolean(draft.chapterId)
  if (step === 2) return draft.amount >= 100
  return true
}
