import { Megaphone } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { ActivityFeedCard } from './ActivityFeedCard'

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return <EmptyState icon={Megaphone} title="Nothing here yet" />
  return (
    <div className="grid-2">
      {activities.map((activity) => (
        <ActivityFeedCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
