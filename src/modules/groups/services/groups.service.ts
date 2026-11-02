import { groupsDb } from './groups.mock'
import { makeJoinCode } from '../utils/join-code'
import { notFound, respond } from '@/lib/mock-api'
import type { Group } from '@/types/domain'

function findGroup(groupId: string): Group {
  return groupsDb.find((group) => group.id === groupId) ?? notFound('Group', groupId)
}

export async function fetchGroup(groupId: string): Promise<Group> {
  return respond(findGroup(groupId))
}

/** Replace the join code; the old link stops working. */
export async function regenerateJoinCode(groupId: string): Promise<Group> {
  const group = findGroup(groupId)
  group.joinCode = makeJoinCode(group.name)
  return respond(group)
}

/** Ask the Directorate to move leadership to someone else. */
export async function requestHandover(groupId: string, newLeader: string): Promise<{ requested: true }> {
  findGroup(groupId)
  if (!newLeader.trim()) throw new Error('Enter the new leader')
  return respond({ requested: true })
}
