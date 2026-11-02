import { matchesOption, matchesSearch } from '../../shared/utils/filters'
import type { GroupFilterValues, GroupTab, ReviewGroup } from '../types'

const TABS: GroupTab[] = ['pending', 'verified', 'rejected', 'suspended']

export function filterGroups(groups: ReviewGroup[], tab: GroupTab, filters: GroupFilterValues): ReviewGroup[] {
  return groups
    .filter((group) => group.status === tab)
    .filter((group) => matchesSearch(filters.search, group.name, group.leaderName))
    .filter((group) => matchesOption(filters.state, group.state))
    .filter((group) => matchesOption(filters.category, group.category))
}

/** How many groups sit in each tab. */
export function countByTab(groups: ReviewGroup[]): Record<GroupTab, number> {
  const counts = Object.fromEntries(TABS.map((tab) => [tab, 0])) as Record<GroupTab, number>
  groups.forEach((group) => { counts[group.status] += 1 })
  return counts
}

/** "Kwara · Ilorin West", "London, United Kingdom", "National" */
export function groupPlace(group: ReviewGroup): string {
  if (group.level === 'national') return 'National'
  if (group.level === 'abroad') return [group.city, group.country].filter(Boolean).join(', ')
  return [group.state, group.lga].filter(Boolean).join(' · ')
}
