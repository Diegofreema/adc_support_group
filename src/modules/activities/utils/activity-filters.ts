import type { Activity, Role } from '@/types/domain'
import type { ActivityTab } from '../types'

export function pendingActivities(activities: Activity[]): Activity[] {
  return activities.filter((activity) => activity.status === 'pending')
}

export function activitiesBy(activities: Activity[], userId: string): Activity[] {
  return activities.filter((activity) => activity.loggedById === userId)
}

/** Activities shown under a tab. */
export function activitiesForTab(activities: Activity[], tab: ActivityTab, userId: string): Activity[] {
  if (tab === 'review') return pendingActivities(activities)
  if (tab === 'mine') return activitiesBy(activities, userId)
  return activities
}

/** Only leaders (and coordinators) approve; members just see their own work. */
export function tabsForRole(role: Role): ActivityTab[] {
  return role === 'leader' ? ['all', 'review', 'mine'] : ['all', 'mine']
}
