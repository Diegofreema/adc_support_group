import { Calendar, UserRound, UsersRound } from 'lucide-react'

import { formatDay, formatNumber } from '@/lib/format'
import type { ReviewActivity } from '../types'

export function ActivityFacts({ activity }: { activity: ReviewActivity }) {
  return (
    <div className="facts mt-2">
      <span><UsersRound className="i" aria-hidden />{activity.groupName}</span>
      <span><Calendar className="i" aria-hidden />{formatDay(activity.date)}</span>
      {activity.peopleReached > 0 && <span><UserRound className="i" aria-hidden />{formatNumber(activity.peopleReached)}</span>}
    </div>
  )
}
