import { CloudOff, RotateCw, SearchX } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Banner, Button, EmptyState, PageLoader } from '@/components/shared'
import { ChaptersPreview } from '@/modules/chapters'
import { ExecutivesSection } from '@/modules/members'
import { useRequiredUser } from '@/stores/session-store'
import { GroupHeader } from '../components/GroupHeader'
import { GroupJoinLink } from '../components/GroupJoinLink'
import { GroupMoneyLink } from '../components/GroupMoneyLink'
import { GroupStats } from '../components/GroupStats'
import { HandoverSection } from '../components/HandoverSection'
import { useActiveGroupId } from '../hooks/use-active-group'
import { useGroup } from '../hooks/use-group'
import { useRequestHandover } from '../hooks/use-group-mutations'
import { canManageGroup } from '../utils/permissions'

const NOT_VERIFIED_TITLE: Record<string, string> = {
  pending: 'Waiting for the Directorate: inviting and adding members open once verified',
  rejected: 'Not approved yet: edit and resubmit from Home',
  suspended: 'This group is suspended',
}

export function GroupPage() {
  const groupId = useActiveGroupId()
  const canManage = canManageGroup(useRequiredUser())
  const { data: group, isLoading, isError, refetch } = useGroup(groupId)
  const handover = useRequestHandover(groupId)
  if (isLoading) return <PageLoader />
  if (isError) {
    return <EmptyState icon={CloudOff} title="Couldn't load your group" action={<Button icon={RotateCw} onClick={() => void refetch()}>Retry</Button>} />
  }
  if (!group) return <EmptyState icon={SearchX} title="Group not found" />
  return (
    <>
      <GroupHeader group={group} />
      <div className="mt-6"><GroupStats group={group} /></div>
      {group.status === 'verified' ? (
        <>
          <div className="grid-2 mt-6 items-start">
            <GroupJoinLink group={group} canManage={canManage} />
            <ExecutivesSection groupId={group.id} canManage={canManage} />
          </div>
          <GroupMoneyLink />
          <ChaptersPreview groupId={group.id} />
          {canManage && <HandoverSection onRequest={(newLeader) => handover.mutate(newLeader)} pending={handover.isPending} />}
        </>
      ) : (
        // Join link, executives, chapters and hand-over only work once verified.
        <Banner tone={group.status === 'suspended' ? 'danger' : 'warn'} className="mt-6" title={NOT_VERIFIED_TITLE[group.status]}>
          <Link to="/home" className="bold">See details on Home</Link>
        </Banner>
      )}
    </>
  )
}
