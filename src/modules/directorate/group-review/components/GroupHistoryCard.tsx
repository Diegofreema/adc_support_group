import { Card, CardHead, Timeline } from '@/components/shared'
import { groupTimeline } from '../utils/history'
import type { ReviewGroup } from '../types'

export function GroupHistoryCard({ group }: { group: ReviewGroup }) {
  return (
    <Card className="mt-4">
      <CardHead title="History" />
      <Timeline steps={groupTimeline(group)} />
    </Card>
  )
}
