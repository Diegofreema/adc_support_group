import { Card, CardHead, Timeline } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { approvalTimeline } from '../utils/approval-steps'

export function ApprovalCard({ activity }: { activity: Activity }) {
  return (
    <Card>
      <CardHead title="Approval" />
      <Timeline steps={approvalTimeline(activity)} />
    </Card>
  )
}
