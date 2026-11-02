import { ACTIVITIES } from './activities.mock'
import { rejectReasonText } from '../utils/reject-reasons'
import { newId, notFound, respond } from '@/lib/mock-api'
import type { User } from '@/types/domain'
import type { ActivityDetail, NewActivityInput, RejectInput } from '../types'

/** Newest first. */
function byDateDesc(a: ActivityDetail, b: ActivityDetail): number {
  return b.date.localeCompare(a.date)
}

function findActivity(id: string): ActivityDetail {
  return ACTIVITIES.find((activity) => activity.id === id) ?? notFound('Activity', id)
}

export async function listActivities(groupId: string): Promise<ActivityDetail[]> {
  return respond(ACTIVITIES.filter((activity) => activity.groupId === groupId).sort(byDateDesc))
}

export async function getActivity(id: string): Promise<ActivityDetail> {
  return respond(findActivity(id))
}

export async function createActivity(input: NewActivityInput, user: User): Promise<ActivityDetail> {
  const activity: ActivityDetail = {
    ...input,
    id: newId('act'),
    groupId: user.activeGroupId ?? '',
    groupName: user.activeGroupName ?? '',
    status: 'pending',
    loggedBy: user.fullName,
  }
  ACTIVITIES.unshift(activity)
  return respond(activity, 600)
}

export async function approveActivity(id: string, approver: User): Promise<ActivityDetail> {
  const activity = findActivity(id)
  Object.assign(activity, { status: 'approved', approvedBy: approver.fullName, rejectionReason: undefined })
  return respond(activity)
}

export async function rejectActivity(id: string, input: RejectInput): Promise<ActivityDetail> {
  const activity = findActivity(id)
  Object.assign(activity, { status: 'rejected', rejectionReason: rejectReasonText(input.reason, input.note) })
  return respond(activity)
}
