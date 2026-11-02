import type { TimelineStep } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { daysAgoLabel } from '../../shared/utils/filters'
import type { ReviewGroup } from '../types'

/** History entries + a "waiting" step while the group is pending. */
export function groupTimeline(group: ReviewGroup): TimelineStep[] {
  const done: TimelineStep[] = group.history.map((entry) => ({
    title: entry.title,
    meta: [formatDay(entry.date), entry.by].filter(Boolean).join(' · '),
    state: 'done',
  }))
  if (group.status !== 'pending') return done
  return [...done, { title: 'Waiting for review', meta: daysAgoLabel(group.submittedAt), state: 'now' }]
}
