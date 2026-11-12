import { Megaphone } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { ActivityDetail } from '../types'
import { ActivityFeedCard } from './ActivityFeedCard'

export function ActivityFeed({ activities }: { activities: ActivityDetail[] }) {
  if (activities.length === 0) return <EmptyState icon={Megaphone} title="Nothing here yet" />
  return (
    <div className="grid-2">
      {activities.map((activity) => (
        <ActivityFeedCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
