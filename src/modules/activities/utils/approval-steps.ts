import type { TimelineStep } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { Activity } from '@/types/domain'

function approvalStep(activity: Activity): TimelineStep {
  if (activity.status === 'rejected') return { title: 'Sent back', meta: activity.rejectionReason, state: 'now' }
  if (activity.approvedBy) return { title: 'Approved by leader', meta: activity.approvedBy, state: 'done' }
  return { title: 'Waiting for leader', state: 'now' }
}

function directorateStep(activity: Activity): TimelineStep {
  return { title: 'Checked by Directorate', state: activity.checkedByDirectorate ? 'done' : 'todo' }
}

/** Recorded → leader approval → Directorate check. */
export function approvalTimeline(activity: Activity): TimelineStep[] {
  return [
    { title: 'Recorded', meta: `${formatDay(activity.date)} · ${activity.loggedBy}`, state: 'done' },
    approvalStep(activity),
    directorateStep(activity),
  ]
}
