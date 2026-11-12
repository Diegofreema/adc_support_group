import type { ActiveBadge } from '../types/home.types'

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

/** "1 more approved activity, or 2 more events, to earn it." Only progress, never "not active". */
export function badgeProgressText(badge: ActiveBadge): string {
  const activities = plural(badge.activitiesToGo, 'more approved activity', 'more approved activities')
  const events = plural(badge.eventsToGo, 'more event', 'more events')
  return `${activities}, or ${events}, to earn it.`
}
