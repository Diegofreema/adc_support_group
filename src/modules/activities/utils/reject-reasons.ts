import type { ChoiceOption } from '@/components/shared'
import type { RejectReasonId } from '../types'

export const REJECT_REASONS: ChoiceOption<RejectReasonId>[] = [
  { value: 'unclear-photos', title: 'Photos unclear' },
  { value: 'missing-count', title: 'Headcount missing' },
  { value: 'wrong-place', title: 'Wrong place' },
  { value: 'duplicate', title: 'Already recorded' },
  { value: 'other', title: 'Other' },
]

export function rejectReasonText(reason: RejectReasonId, note?: string): string {
  const title = String(REJECT_REASONS.find((option) => option.value === reason)?.title ?? 'Other')
  return note ? `${title}. ${note}` : title
}
