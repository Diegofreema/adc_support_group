import { PageLoader } from '@/components/shared'
import { TwoColumn } from '@/components/layout/TwoColumn'
import { useDisclosure } from '@/hooks/use-disclosure'
import { InviteDialog } from '../components/InviteDialog'
import { LeaderGroupCard } from '../components/LeaderGroupCard'
import { LeaderQuickActions } from '../components/LeaderQuickActions'
import { MonthStats } from '../components/MonthStats'
import { RecentList } from '../components/RecentList'
import { SwitchGroupDialog } from '../components/SwitchGroupDialog'
import { TodoList } from '../components/TodoList'
import { useLeaderDashboard } from '../hooks/use-leader-dashboard'
import type { LeaderDashboard } from '../types/home.types'

export function LeaderHomePage() {
  const { data } = useLeaderDashboard()
  if (!data) return <PageLoader />
  return <LeaderHome dashboard={data} />
}

function LeaderHome({ dashboard }: { dashboard: LeaderDashboard }) {
  const invite = useDisclosure()
  const switcher = useDisclosure()
  const { group } = dashboard
  return (
    <>
      <TwoColumn
        left={(
          <>
            <LeaderGroupCard group={group} onSwitch={switcher.open} />
            <LeaderQuickActions onInvite={invite.open} />
            <TodoList items={dashboard.todos} />
          </>
        )}
        right={(
          <>
            <MonthStats month={dashboard.month} />
            <RecentList items={dashboard.recent} />
          </>
        )}
      />
      <InviteDialog open={invite.isOpen} onOpenChange={invite.setOpen} code={group.joinCode} groupName={group.name} />
      <SwitchGroupDialog open={switcher.isOpen} onOpenChange={switcher.setOpen} groups={dashboard.groups} currentId={group.id} />
    </>
  )
}
