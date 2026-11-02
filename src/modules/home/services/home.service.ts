import { LEADER_DASHBOARDS, MEMBER_DASHBOARDS } from './home.mock'
import type { LeaderDashboard, MemberDashboard } from '../types/home.types'
import { respond } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'

const DEFAULT_LEADER_GROUP = 'grp_awn'
const DEFAULT_MEMBER = 'usr_tunde'

/** One call for everything on the leader home screen. */
export async function fetchLeaderDashboard(groupId: string | undefined): Promise<LeaderDashboard> {
  const dashboard = LEADER_DASHBOARDS[groupId ?? ''] ?? LEADER_DASHBOARDS[DEFAULT_LEADER_GROUP]!
  return respond(dashboard)
}

/** One call for everything on the member home screen. */
export async function fetchMemberDashboard(userId: string): Promise<MemberDashboard> {
  const dashboard = MEMBER_DASHBOARDS[userId] ?? MEMBER_DASHBOARDS[DEFAULT_MEMBER]!
  return respond(dashboard)
}

/** Make another group the one the user is working on. */
export async function switchActiveGroup(group: { id: string; name: string }): Promise<void> {
  const user = sessionStore.getUser()
  if (!user) return
  await respond(null, 200)
  sessionStore.setUser({ ...user, activeGroupId: group.id, activeGroupName: group.name })
}
