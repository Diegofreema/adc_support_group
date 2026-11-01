import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchMemberDashboard } from '../services/home.service'
import { useRequiredUser } from '@/stores/session-store'

export const memberDashboardQuery = (userId: string) =>
  queryOptions({ queryKey: ['home', 'member', userId], queryFn: () => fetchMemberDashboard(userId) })

export function useMemberDashboard() {
  const user = useRequiredUser()
  return useQuery(memberDashboardQuery(user.id))
}
