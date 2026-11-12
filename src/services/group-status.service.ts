import { queryOptions } from '@tanstack/react-query'

import { rpc } from '@/lib/supabase'
import type { GroupStatus } from '@/types/domain'

/** The caller's group status (null when they have no group, e.g. Directorate staff). */
async function fetchMyGroupStatus(): Promise<GroupStatus | null> {
  const mine = await rpc<{ group: { status: GroupStatus } | null }>('get_my_support_group')
  return mine.group?.status ?? null
}

export const myGroupStatusQuery = queryOptions({
  queryKey: ['my-group-status'],
  queryFn: fetchMyGroupStatus,
  staleTime: 60_000,
})
