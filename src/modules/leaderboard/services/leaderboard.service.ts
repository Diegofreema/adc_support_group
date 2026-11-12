import { rpc } from '@/lib/supabase'
import type { Board, BoardMeasure, BoardRow, BoardScope } from '../types/leaderboard.types'

/** How many groups the board shows above the caller's own place. */
export const TOP_COUNT = 20

interface BoardRowJson {
  group_id: string
  name: string
  photo_url: string | null
  state: string
  category: string | null
  activities: number
  people: number
  rank: number
  is_mine: boolean
}

interface BoardJson {
  snapshot_on: string | null
  scope: BoardScope
  measure: BoardMeasure
  board_name: string | null
  group_count: number
  mine: BoardRowJson | null
  rows: BoardRowJson[]
}

function toRow(json: BoardRowJson): BoardRow {
  return {
    groupId: json.group_id,
    name: json.name,
    photoUrl: json.photo_url ?? undefined,
    state: json.state,
    category: json.category ?? undefined,
    activities: Number(json.activities),
    people: Number(json.people),
    place: Number(json.rank),
    isMine: json.is_mine,
  }
}

function toBoard(json: BoardJson): Board {
  return {
    snapshotOn: json.snapshot_on ?? undefined,
    scope: json.scope,
    measure: json.measure,
    boardName: json.board_name ?? undefined,
    groupCount: Number(json.group_count),
    mine: json.mine ? toRow(json.mine) : undefined,
    rows: json.rows.map(toRow),
  }
}

/** The caller's group's board (get_support_group_leaderboard). */
export async function fetchBoard(scope: BoardScope, measure: BoardMeasure): Promise<Board> {
  const json = await rpc<BoardJson>('get_support_group_leaderboard', { p_scope: scope, p_measure: measure, p_limit: TOP_COUNT })
  return toBoard(json)
}
