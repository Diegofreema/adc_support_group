import { useRequiredUser } from '@/stores/session-store'
import { LeaderHomePage } from './LeaderHomePage'
import { LeaderWaitingPage } from './LeaderWaitingPage'
import { MemberHomePage } from './MemberHomePage'
import { SuspendedGroupPage } from './SuspendedGroupPage'

/**
 * No group never gets here (/get-started). Suspended → why. A leader whose group is
 * pending or rejected → the waiting page. Otherwise the dashboards.
 */
export function HomePage() {
  const user = useRequiredUser()
  const status = user.activeGroupStatus
  const isLeader = user.role === 'leader'
  if (!status) return null
  if (status === 'suspended') return <SuspendedGroupPage isLeader={isLeader} />
  if (isLeader && (status === 'pending' || status === 'rejected')) return <LeaderWaitingPage />
  return isLeader ? <LeaderHomePage /> : <MemberHomePage />
}
