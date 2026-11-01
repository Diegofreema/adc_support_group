import { SearchX } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import { ChaptersPreview } from '@/modules/chapters'
import { ExecutivesSection } from '@/modules/members'
import { useRequiredUser } from '@/stores/session-store'
import { GroupHeader } from '../components/GroupHeader'
import { GroupJoinLink } from '../components/GroupJoinLink'
import { GroupStats } from '../components/GroupStats'
import { HandoverSection } from '../components/HandoverSection'
import { PageLoading } from '../components/PageLoading'
import { useActiveGroupId } from '../hooks/use-active-group'
import { useGroup } from '../hooks/use-group'
import { useRequestHandover } from '../hooks/use-group-mutations'
import { canManageGroup } from '../utils/permissions'

export function GroupPage() {
  const groupId = useActiveGroupId()
  const canManage = canManageGroup(useRequiredUser())
  const { data: group, isLoading } = useGroup(groupId)
  const handover = useRequestHandover(groupId)
  if (isLoading) return <PageLoading />
  if (!group) return <EmptyState icon={SearchX} title="Group not found" />
  return (
    <>
      <GroupHeader group={group} />
      <div className="mt-6"><GroupStats group={group} /></div>
      <div className="grid-2 mt-6 items-start">
        <GroupJoinLink group={group} canManage={canManage} />
        <ExecutivesSection groupId={group.id} canManage={canManage} />
      </div>
      <ChaptersPreview groupId={group.id} />
      {canManage && <HandoverSection onRequest={(newLeader) => handover.mutate(newLeader)} pending={handover.isPending} />}
    </>
  )
}
