import { useQuery } from '@tanstack/react-query'

import { myGroupStatusQuery } from '@/services/group-status.service'

/**
 * Whether actions that need a verified group are locked for the session user.
 * Locked only once we know the group isn't verified; the server refuses anyway.
 */
export function useGroupLocked(): boolean {
  const { data: status } = useQuery(myGroupStatusQuery)
  return !!status && status !== 'verified'
}
