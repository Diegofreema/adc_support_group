import { useState } from 'react'

import { tabsFor } from '../utils/activity-filters'
import { useActivityList, useReviewCount } from './use-activity-list'
import type { TabItem } from '@/components/shared'
import { hasPower } from '@/lib/permissions'
import { useRequiredUser } from '@/stores/session-store'
import type { ActivityTab } from '../types'

const TAB_LABELS: Record<ActivityTab, string> = { all: 'All', review: 'To review', mine: 'Mine' }

/** View-model for the activities screen: tab state + that tab's server-paged list. */
export function useActivityTabs() {
  const user = useRequiredUser()
  const groupId = user.activeGroupId ?? ''
  const canApprove = hasPower(user, 'approvals')
  const [tab, setTab] = useState<ActivityTab>('all')
  const list = useActivityList(groupId, tab)
  const reviewCount = useReviewCount(groupId, canApprove)

  const tabs: TabItem<ActivityTab>[] = tabsFor(canApprove).map((value) => ({
    value,
    label: TAB_LABELS[value],
    count: value === 'review' ? (tab === 'review' ? list.total : reviewCount) : undefined,
  }))

  return { tab, setTab, tabs, ...list }
}
