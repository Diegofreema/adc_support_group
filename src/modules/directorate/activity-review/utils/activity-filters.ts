import { matchesOption, matchesSearch } from '../../shared/utils/filters'
import type { ActivityFilterValues, ReviewActivity, ReviewStage } from '../types'

const STAGES: ReviewStage[] = ['to-check', 'leader-approved', 'flagged']

export function filterActivities(activities: ReviewActivity[], stage: ReviewStage, filters: ActivityFilterValues): ReviewActivity[] {
  return activities
    .filter((activity) => activity.stage === stage)
    .filter((activity) => matchesSearch(filters.search, activity.groupName, activity.title, activity.state))
    .filter((activity) => matchesOption(filters.type, activity.type))
    .filter((activity) => matchesOption(filters.state, activity.state))
}

export function countByStage(activities: ReviewActivity[]): Record<ReviewStage, number> {
  return Object.fromEntries(STAGES.map((stage) => [stage, activities.filter((activity) => activity.stage === stage).length])) as Record<ReviewStage, number>
}
