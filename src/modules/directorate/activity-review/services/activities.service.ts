import { queryOptions } from '@tanstack/react-query'

import { ACTIVITIES } from './activities.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { ReviewActivity } from '../types'
import { notFound, respond } from '@/lib/mock-api'

let db: ReviewActivity[] = structuredClone(ACTIVITIES)

function removeFromQueue(id: string): ReviewActivity {
  const activity = db.find((item) => item.id === id) ?? notFound('Activity', id)
  db = db.filter((item) => item.id !== id)
  return activity
}

export const reviewActivitiesQuery = queryOptions({ queryKey: directorateKeys.activities(), queryFn: () => respond(db) })

/** Directorate confirms the activity counts. */
export async function approveActivity(id: string): Promise<ReviewActivity> {
  const activity = removeFromQueue(id)
  return respond({ ...activity, status: 'approved', checkedByDirectorate: true })
}

/** Reject (or overturn a leader's approval) with a reason the group reads. */
export async function rejectActivity(id: string, reason: string): Promise<ReviewActivity> {
  const activity = removeFromQueue(id)
  return respond({ ...activity, status: 'rejected', rejectionReason: reason })
}
