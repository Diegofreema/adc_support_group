import { useState } from 'react'

import { activitiesForTab, pendingActivities, tabsForRole } from '../utils/activity-filters'
import { useActivities } from './use-activities'
import type { TabItem } from '@/components/shared'
import { useRequiredUser } from '@/stores/session-store'
import type { ActivityTab } from '../types'

const TAB_LABELS: Record<ActivityTab, string> = { all: 'All', review: 'To review', mine: 'Mine' }

/** View-model for the activities screen: tab state + the list for that tab. */
export function useActivityTabs() {
  const user = useRequiredUser()
  const query = useActivities(user.activeGroupId ?? '')
  const [tab, setTab] = useState<ActivityTab>('all')
  const activities = query.data ?? []
  const reviewCount = pendingActivities(activities).length

  const tabs: TabItem<ActivityTab>[] = tabsForRole(user.role).map((value) => ({
    value,
    label: TAB_LABELS[value],
    count: value === 'review' ? reviewCount : undefined,
  }))

  return { tab, setTab, tabs, isLoading: query.isLoading, visible: activitiesForTab(activities, tab, user.fullName) }
}
