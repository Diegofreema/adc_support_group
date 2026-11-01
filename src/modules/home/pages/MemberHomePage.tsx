import { PageLoader } from '@/components/shared'
import { TwoColumn } from '@/components/layout/TwoColumn'
import { useRequiredUser } from '@/stores/session-store'
import { InviteFriendCard } from '../components/InviteFriendCard'
import { LeaderNotes } from '../components/LeaderNotes'
import { MemberActivityCard } from '../components/MemberActivityCard'
import { MyActivitiesList } from '../components/MyActivitiesList'
import { MyGroupsList } from '../components/MyGroupsList'
import { useMemberDashboard } from '../hooks/use-member-dashboard'

export function MemberHomePage() {
  const user = useRequiredUser()
  const { data } = useMemberDashboard()
  if (!data) return <PageLoader />
  return (
    <TwoColumn
      left={(
        <>
          <MemberActivityCard approvedCount={data.approvedCount} approvedGrowth={data.approvedGrowth} groupCount={data.groups.length} />
          <MyGroupsList groups={data.groups} />
          <MyActivitiesList activities={data.activities} />
        </>
      )}
      right={(
        <>
          <LeaderNotes notes={data.notes} />
          <InviteFriendCard code={data.inviteCode} groupName={user.activeGroupName ?? 'my group'} />
        </>
      )}
    />
  )
}
