import { useRequiredUser } from '@/stores/session-store'
import { LeaderHomePage } from './LeaderHomePage'
import { MemberHomePage } from './MemberHomePage'

/** Leaders (and executives/coordinators) get the group dashboard; members get theirs. */
export function HomePage() {
  const user = useRequiredUser()
  return user.role === 'leader' ? <LeaderHomePage /> : <MemberHomePage />
}
