import type { TimelineStep } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { GroupReview } from '../types/home.types'

/** Submitted → Being checked → Verified, or → Not approved. */
export function reviewSteps(review: GroupReview): TimelineStep[] {
  const submitted: TimelineStep = { title: 'Submitted', meta: formatDay(review.submittedAt), state: 'done' }
  if (review.status === 'rejected') {
    return [
      submitted,
      { title: 'Checked', meta: review.reviewedAt ? formatDay(review.reviewedAt) : 'Directorate', state: 'done' },
      { title: 'Not approved: edit and resubmit', state: 'now' },
    ]
  }
  if (review.status === 'verified') {
    return [submitted, { title: 'Being checked', state: 'done' }, { title: 'Verified', state: 'done' }]
  }
  return [
    submitted,
    { title: 'Being checked', meta: review.waitingForReply ? 'Waiting for your reply' : 'Usually 1–3 days', state: 'now' },
    { title: 'Verified', state: 'todo' },
  ]
}
