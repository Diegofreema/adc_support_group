import { Calendar, MapPin, Users } from 'lucide-react'

import { formatNumber } from '@/lib/format'
import type { Activity } from '@/types/domain'
import { activityDayLabel } from '../utils/activity-display'

interface ActivityFactsProps {
  activity: Activity
  /** Override the place shown (e.g. full "Ward, State"). */
  place?: string
  className?: string
}

/** Date · place · people, in one muted line. */
export function ActivityFacts({ activity, place, className = 'mt-2' }: ActivityFactsProps) {
  return (
    <div className={`facts ${className}`}>
      <span><Calendar className="i" aria-hidden />{activityDayLabel(activity.date)}</span>
      <span><MapPin className="i" aria-hidden />{place ?? activity.state}</span>
      <span><Users className="i" aria-hidden />{formatNumber(activity.peopleReached)}</span>
    </div>
  )
}
