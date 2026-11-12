import { useState } from 'react'

import type { TabItem } from '@/components/shared'
import { hasPower } from '@/lib/permissions'
import { useRequiredUser } from '@/stores/session-store'
import type { EventWhen } from '../types'
import { useEventList } from './use-event-list'

const TABS: TabItem<EventWhen>[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

/** View-model for the events screen: tab state + that tab's paged list. */
export function useEventTabs() {
  const user = useRequiredUser()
  const [tab, setTab] = useState<EventWhen>('upcoming')
  const list = useEventList(user.activeGroupId ?? '', tab)
  return { tab, setTab, tabs: TABS, canCreate: hasPower(user, 'events'), ...list }
}
