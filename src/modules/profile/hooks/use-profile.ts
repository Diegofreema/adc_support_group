import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchProfile } from '../services/profile.service'
import { useRequiredUser } from '@/stores/session-store'

export const profileQuery = (userId: string) => queryOptions({ queryKey: ['profile', userId], queryFn: () => fetchProfile(userId) })

export function useProfile() {
  const user = useRequiredUser()
  return useQuery(profileQuery(user.id))
}
