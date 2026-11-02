import { queryOptions } from '@tanstack/react-query'

import { GROUPS } from './groups.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { ReviewGroup } from '../types'
import { notFound, respond } from '@/lib/mock-api'
import type { GroupStatus } from '@/types/domain'

const db: ReviewGroup[] = structuredClone(GROUPS)

function findGroup(id: string): ReviewGroup {
  return db.find((group) => group.id === id) ?? notFound('Group', id)
}

/** Move a group to a new status and record it in its history. */
function decide(id: string, status: GroupStatus, title: string, patch: Partial<ReviewGroup> = {}): Promise<ReviewGroup> {
  const group = findGroup(id)
  const now = new Date().toISOString()
  Object.assign(group, patch, { status, decidedAt: now, history: [...group.history, { title, date: now, by: 'Hauwa Bello' }] })
  return respond(group)
}

export const groupsQuery = queryOptions({ queryKey: directorateKeys.groups(), queryFn: () => respond(db) })

export const groupQuery = (id: string) =>
  queryOptions({ queryKey: directorateKeys.group(id), queryFn: () => respond(findGroup(id)) })

export const verifyGroup = (id: string) => decide(id, 'verified', 'Verified')

export const rejectGroup = (id: string, reason: string) => decide(id, 'rejected', 'Rejected', { rejectionReason: reason })

export const suspendGroup = (id: string, reason: string) => decide(id, 'suspended', 'Suspended', { suspendedReason: reason })

export const restoreGroup = (id: string) => decide(id, 'verified', 'Restored', { suspendedReason: undefined })

/** Sends the leader a message; status stays pending. */
export async function askForInfo(id: string, message: string): Promise<ReviewGroup> {
  const group = findGroup(id)
  group.history = [...group.history, { title: `Asked: ${message}`, date: new Date().toISOString(), by: 'Hauwa Bello' }]
  return respond(group)
}
