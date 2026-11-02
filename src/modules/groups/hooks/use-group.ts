import { queryOptions, useQuery } from '@tanstack/react-query'

import { groupKeys } from './query-keys'
import { fetchGroup } from '../services/groups.service'

export const groupQuery = (groupId: string) =>
  queryOptions({ queryKey: groupKeys.detail(groupId), queryFn: () => fetchGroup(groupId) })

export function useGroup(groupId: string) {
  return useQuery(groupQuery(groupId))
}
