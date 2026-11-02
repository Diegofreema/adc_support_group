import type { ReasonChoice } from '../../shared/utils/reasons'

export const REJECT_REASONS: readonly ReasonChoice[] = [
  { value: 'duplicate', label: 'Duplicate group' },
  { value: 'unreachable', label: 'Leader not reachable' },
  { value: 'details', label: 'Details look wrong' },
  { value: 'not-support', label: 'Not a support group' },
]

export const SUSPEND_REASONS: readonly ReasonChoice[] = [
  { value: 'fake', label: 'Fake activities' },
  { value: 'conduct', label: 'Bad conduct' },
  { value: 'other', label: 'Other' },
]
