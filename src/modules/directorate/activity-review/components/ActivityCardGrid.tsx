import { ClipboardCheck } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { ReviewActivity } from '../types'
import { ActivityReviewCard } from './ActivityReviewCard'

interface ActivityCardGridProps {
  activities: ReviewActivity[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function ActivityCardGrid({ activities, onApprove, onReject }: ActivityCardGridProps) {
  if (!activities.length) return <EmptyState icon={ClipboardCheck} title="All checked" />
  return (
    <div className="grid-2">
      {activities.map((activity) => (
        <ActivityReviewCard key={activity.id} activity={activity} onApprove={onApprove} onReject={onReject} />
      ))}
    </div>
  )
}
