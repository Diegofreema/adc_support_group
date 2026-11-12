import { PageLoader } from '@/components/shared'
import { TwoColumn } from '@/components/layout/TwoColumn'
import { useRequiredUser } from '@/stores/session-store'
import { InviteFriendCard } from '../components/InviteFriendCard'
import { LeaderNotes } from '../components/LeaderNotes'
import { MemberActivityCard } from '../components/MemberActivityCard'
import { MyActivitiesList } from '../components/MyActivitiesList'
import { MyGroupsList } from '../components/MyGroupsList'
import { NextEvents } from '../components/NextEvents'
import { useMemberDashboard } from '../hooks/use-member-dashboard'
import { useNextEvents } from '../hooks/use-next-events'

export function MemberHomePage() {
  const user = useRequiredUser()
  const { data } = useMemberDashboard()
  const next = useNextEvents()
  if (!data) return <PageLoader />
  return (
    <TwoColumn
      left={(
        <>
          <NextEvents events={next.events} onAnswer={next.answer} pendingId={next.pendingId} />
          <MemberActivityCard approvedCount={data.approvedCount} approvedGrowth={data.approvedGrowth} groupCount={data.groups.length} />
          {data.groups.length > 0 && <MyGroupsList groups={data.groups} />}
          <MyActivitiesList activities={data.activities} />
        </>
      )}
      right={(
        <>
          <LeaderNotes notes={data.notes} />
          {data.inviteCode && user.activeGroupStatus === 'verified' && <InviteFriendCard code={data.inviteCode} groupName={user.activeGroupName ?? 'my group'} />}
        </>
      )}
    />
  )
}
