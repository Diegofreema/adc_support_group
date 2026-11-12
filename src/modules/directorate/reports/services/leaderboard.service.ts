import { queryOptions } from '@tanstack/react-query'

import type { Page } from '../../shared/services/paging'
import { directorateKeys } from '../../shared/query-keys'
import type { BoardGroup, BoardMeasure, LeaderboardFilters } from '../types'
import { rpc } from '@/lib/supabase'

interface BoardRowJson {
  group_id: string
  name: string
  state: string
  category: string | null
  activities: number
  people: number
  rank: number
}

interface BoardJson extends Page<BoardRowJson> {
  snapshot_on: string | null
}

/** A page of the board plus the day its snapshot was taken ('YYYY-MM-DD'). */
export interface BoardPage extends Page<BoardGroup> {
  snapshotOn?: string
}

function toBoardGroup(json: BoardRowJson): BoardGroup {
  return {
    groupId: json.group_id,
    name: json.name,
    state: json.state,
    category: json.category ?? undefined,
    activities: Number(json.activities),
    people: Number(json.people),
    place: Number(json.rank),
  }
}

/** Verified groups ranked within the filtered board (get_admin_sg_leaderboard; state admins see their state). */
async function fetchBoard(filters: LeaderboardFilters, measure: BoardMeasure, limit: number, offset: number): Promise<BoardPage> {
  const json = await rpc<BoardJson>('get_admin_sg_leaderboard', {
    p_state: filters.state || null,
    p_category_id: filters.category || null,
    p_measure: measure,
    p_limit: limit,
    p_offset: offset,
  })
  return { snapshotOn: json.snapshot_on ?? undefined, total: Number(json.total), rows: json.rows.map(toBoardGroup) }
}

export const leaderboardQuery = (filters: LeaderboardFilters, measure: BoardMeasure, limit: number, offset: number) =>
  queryOptions({
    queryKey: [...directorateKeys.leaderboard(), filters, measure, limit, offset],
    queryFn: () => fetchBoard(filters, measure, limit, offset),
  })
