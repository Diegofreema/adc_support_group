import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchInvite } from '../services/join.service'

export const inviteQuery = (code: string) => queryOptions({ queryKey: ['invite', code], queryFn: () => fetchInvite(code) })

export function useInvite(code: string) {
  return useQuery(inviteQuery(code))
}
