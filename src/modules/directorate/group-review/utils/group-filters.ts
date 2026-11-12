import type { Group } from '@/types/domain'

/** "Kwara · Ilorin West", "London, United Kingdom", "National" */
export function groupPlace(group: Pick<Group, 'level' | 'state' | 'lga' | 'city' | 'country'>): string {
  if (group.level === 'national') return 'National'
  if (group.level === 'abroad') return [group.city, group.country].filter(Boolean).join(', ')
  return [group.state, group.lga].filter(Boolean).join(' · ')
}
