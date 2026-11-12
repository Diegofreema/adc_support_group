import { useRequiredUser } from '@/stores/session-store'
import { LeaderHomePage } from './LeaderHomePage'
import { LeaderWaitingPage } from './LeaderWaitingPage'
import { MemberHomePage } from './MemberHomePage'
import { NoGroupPage } from './NoGroupPage'
import { SuspendedGroupPage } from './SuspendedGroupPage'

/**
 * No group → how to get one. Suspended → why. A leader whose group is
 * pending or rejected → the waiting page. Otherwise the dashboards.
 */
export function HomePage() {
  const user = useRequiredUser()
  const status = user.activeGroupStatus
  const isLeader = user.role === 'leader'
  if (!user.activeGroupId || !status) return <NoGroupPage />
  if (status === 'suspended') return <SuspendedGroupPage isLeader={isLeader} />
  if (isLeader && (status === 'pending' || status === 'rejected')) return <LeaderWaitingPage />
  return isLeader ? <LeaderHomePage /> : <MemberHomePage />
}
