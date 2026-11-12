import { queryOptions, useQuery } from '@tanstack/react-query'

import { useSessionUser } from '@/stores/session-store'
import { fetchBoard } from '../services/leaderboard.service'
import { leaderboardKeys } from '../utils/leaderboard-keys'
import type { BoardMeasure, BoardScope } from '../types/leaderboard.types'

/** Boards change once a day; no need to refetch often. */
const BOARD_STALE_MS = 30 * 60_000

export const boardQuery = (groupId: string, scope: BoardScope, measure: BoardMeasure) =>
  queryOptions({ queryKey: leaderboardKeys.board(groupId, scope, measure), queryFn: () => fetchBoard(scope, measure), staleTime: BOARD_STALE_MS })

/** One board for the caller's active group; only runs for a verified group. */
export function useBoard(scope: BoardScope, measure: BoardMeasure) {
  const user = useSessionUser()
  const groupId = user?.activeGroupId ?? ''
  const enabled = Boolean(groupId) && user?.activeGroupStatus === 'verified'
  return useQuery({ ...boardQuery(groupId, scope, measure), enabled })
}
