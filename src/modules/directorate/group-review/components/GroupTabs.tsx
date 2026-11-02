import { Tabs, type TabItem } from '@/components/shared'
import type { GroupTab } from '../types'

const LABELS: Record<GroupTab, string> = { pending: 'To verify', verified: 'Verified', rejected: 'Rejected', suspended: 'Suspended' }

interface GroupTabsProps {
  value: GroupTab
  counts: Record<GroupTab, number>
  onChange: (tab: GroupTab) => void
}

export function GroupTabs({ value, counts, onChange }: GroupTabsProps) {
  const tabs: TabItem<GroupTab>[] = (Object.keys(LABELS) as GroupTab[]).map((tab) => ({ value: tab, label: LABELS[tab], count: counts[tab] }))
  return <Tabs label="Group status" tabs={tabs} value={value} onChange={onChange} />
}
