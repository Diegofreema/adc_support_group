import { useMemo } from 'react'

import { useMemberPage } from './use-members'
import { selectExecutives } from '../utils/filters'

/** Executives are few; one call of the RPC's maximum covers them. */
const EXECUTIVES_QUERY = { filter: 'executives', search: '', limit: 500, offset: 0 } as const

/** The leader (from the roster's `leader`, so executives see them too) then the executives. */
export function useExecutives(groupId: string) {
  const roster = useMemberPage(groupId, EXECUTIVES_QUERY)
  const executives = useMemo(() => selectExecutives(roster.data?.leader ?? null, roster.data?.rows ?? []), [roster.data])
  return { executives, isLoading: roster.isLoading }
}
