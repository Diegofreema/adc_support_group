import { Tabs, type TabItem } from '@/components/shared'
import type { ReviewStage } from '../types'

const LABELS: Record<ReviewStage, string> = { 'to-check': 'To check', 'leader-approved': 'Approved by leaders', flagged: 'Flagged' }

interface ActivityStageTabsProps {
  value: ReviewStage
  counts: Record<ReviewStage, number>
  onChange: (stage: ReviewStage) => void
}

export function ActivityStageTabs({ value, counts, onChange }: ActivityStageTabsProps) {
  const tabs: TabItem<ReviewStage>[] = (Object.keys(LABELS) as ReviewStage[]).map((stage) => ({ value: stage, label: LABELS[stage], count: counts[stage] }))
  return <Tabs label="Review stage" tabs={tabs} value={value} onChange={onChange} />
}
