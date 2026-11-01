import { useQuery } from '@tanstack/react-query'

import { navBadgesQuery, type NavBadges } from '@/services/nav-badges.service'

export type { NavBadges }

export function useNavBadges(): NavBadges {
  return useQuery(navBadgesQuery).data ?? {}
}
