import { useState } from 'react'

import { Card, CardHead, Tabs, type TabItem } from '@/components/shared'
import { RankedList } from '../../shared/components/RankedList'
import { rankGroups } from '../utils/ranking'
import type { GroupScore, ScoreMetric } from '../types'

const TABS: TabItem<ScoreMetric>[] = [
  { value: 'activities', label: 'Activities' },
  { value: 'members', label: 'Members' },
  { value: 'money', label: 'Money' },
]

/** Leaderboard of groups by raw counts. */
export function TopGroupsCard({ groups }: { groups: GroupScore[] }) {
  const [metric, setMetric] = useState<ScoreMetric>('activities')
  return (
    <Card>
      <CardHead title="Top groups" />
      <Tabs label="Rank by" tabs={TABS} value={metric} onChange={setMetric} />
      <RankedList entries={rankGroups(groups, metric)} />
    </Card>
  )
}
