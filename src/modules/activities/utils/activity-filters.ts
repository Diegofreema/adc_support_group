import type { Activity } from '@/types/domain'
import type { ActivityTab } from '../types'

export function pendingActivities<T extends Activity>(activities: T[]): T[] {
  return activities.filter((activity) => activity.status === 'pending')
}

export function activitiesBy<T extends Activity>(activities: T[], userId: string): T[] {
  return activities.filter((activity) => activity.loggedById === userId)
}

/** Activities shown under a tab. */
export function activitiesForTab<T extends Activity>(activities: T[], tab: ActivityTab, userId: string): T[] {
  if (tab === 'review') return pendingActivities(activities)
  if (tab === 'mine') return activitiesBy(activities, userId)
  return activities
}

/** People with the approvals power get a review tab; members just see their own work. */
export function tabsFor(canApprove: boolean): ActivityTab[] {
  return canApprove ? ['all', 'review', 'mine'] : ['all', 'mine']
}
