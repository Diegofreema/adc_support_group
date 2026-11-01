import type { Activity, Role } from '@/types/domain'
import type { ActivityTab } from '../types'

export function pendingActivities(activities: Activity[]): Activity[] {
  return activities.filter((activity) => activity.status === 'pending')
}

export function activitiesBy(activities: Activity[], userName: string): Activity[] {
  return activities.filter((activity) => activity.loggedBy === userName)
}

/** Activities shown under a tab. */
export function activitiesForTab(activities: Activity[], tab: ActivityTab, userName: string): Activity[] {
  if (tab === 'review') return pendingActivities(activities)
  if (tab === 'mine') return activitiesBy(activities, userName)
  return activities
}

/** Only leaders (and coordinators) approve; members just see their own work. */
export function tabsForRole(role: Role): ActivityTab[] {
  return role === 'leader' ? ['all', 'review', 'mine'] : ['all', 'mine']
}
