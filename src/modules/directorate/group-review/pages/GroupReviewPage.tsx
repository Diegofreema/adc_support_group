import { getRouteApi } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { DuplicateBanner } from '../components/DuplicateBanner'
import { GroupDetailsCard } from '../components/GroupDetailsCard'
import { GroupHistoryCard } from '../components/GroupHistoryCard'
import { GroupReviewHeader } from '../components/GroupReviewHeader'
import { GroupSideActions } from '../components/GroupSideActions'
import { LeaderCard } from '../components/LeaderCard'
import { MembersSourceCard } from '../components/MembersSourceCard'
import { SuspendSection } from '../components/SuspendSection'
import { useGroup } from '../hooks/use-groups'
import type { ReviewGroup } from '../types'

const reviewRoute = getRouteApi('/admin/groups/$groupId')

export function GroupReviewPage() {
  const { groupId } = reviewRoute.useParams()
  const { data: group, isError } = useGroup(groupId)
  if (isError) return <EmptyState icon={ShieldCheck} title="Group not found" />
  if (!group) return null
  return (
    <>
      <GroupReviewHeader group={group} />
      <SplitLayout main={<GroupReviewDetails group={group} />} side={<GroupSideActions group={group} />} />
    </>
  )
}

function GroupReviewDetails({ group }: { group: ReviewGroup }) {
  return (
    <>
      <DuplicateBanner group={group} />
      <GroupDetailsCard group={group} />
      <LeaderCard group={group} />
      <MembersSourceCard group={group} />
      <GroupHistoryCard group={group} />
      {group.status === 'verified' && <SuspendSection groupId={group.id} />}
    </>
  )
}
