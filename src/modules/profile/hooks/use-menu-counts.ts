import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchMenuCounts } from '../services/profile.service'
import { useNavBadges } from '@/components/layout/use-nav-badges'

const menuCountsQuery = queryOptions({ queryKey: ['more', 'counts'], queryFn: fetchMenuCounts })

/** Counts beside the "More" menu items. */
export function useMenuCounts() {
  const { data } = useQuery(menuCountsQuery)
  const badges = useNavBadges()
  return { members: data?.members, chapters: data?.chapters, notifications: badges.notifications }
}
