import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchLeaderDashboard } from '../services/home.service'
import { useRequiredUser } from '@/stores/session-store'

export const leaderDashboardQuery = (groupId: string | undefined) =>
  queryOptions({ queryKey: ['home', 'leader', groupId], queryFn: () => fetchLeaderDashboard(groupId) })

export function useLeaderDashboard() {
  const user = useRequiredUser()
  return useQuery(leaderDashboardQuery(user.activeGroupId))
}
