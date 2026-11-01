import type { ReasonChoice } from '../../shared/utils/reasons'

export const ACTIVITY_REJECT_REASONS: readonly ReasonChoice[] = [
  { value: 'photos', label: 'Photos unclear' },
  { value: 'headcount', label: 'Headcount looks wrong' },
  { value: 'reused', label: 'Photos used before' },
  { value: 'not-activity', label: 'Not a campaign activity' },
]
