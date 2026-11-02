import { queryOptions } from '@tanstack/react-query'

import { respond } from '@/lib/mock-api'
import type { BadgeKey } from '@/config/navigation'

export type NavBadges = Partial<Record<BadgeKey, number>>

/** Mock counts for nav badges. Replace with a single "counts" endpoint later. */
async function fetchNavBadges(): Promise<NavBadges> {
  return respond({ toReview: 4, notifications: 3, groupsToVerify: 18, activitiesToCheck: 42, offlineToConfirm: 5 }, 150)
}

export const navBadgesQuery = queryOptions({ queryKey: ['nav-badges'], queryFn: fetchNavBadges })
