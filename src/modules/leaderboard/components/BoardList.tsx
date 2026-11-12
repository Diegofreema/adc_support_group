import { List } from '@/components/shared'
import type { BoardMeasure, BoardRow } from '../types/leaderboard.types'
import { BoardRowItem } from './BoardRowItem'

interface BoardListProps {
  rows: BoardRow[]
  mine?: BoardRow
  measure: BoardMeasure
}

/** Top rows; the caller's group is pinned after a "…" when it sits below them. */
export function BoardList({ rows, mine, measure }: BoardListProps) {
  const pinMine = mine && !rows.some((row) => row.isMine)
  return (
    <List className="card card-flush">
      {rows.map((row) => <BoardRowItem key={row.groupId} row={row} measure={measure} />)}
      {pinMine && <Gap />}
      {pinMine && <BoardRowItem row={mine} measure={measure} />}
    </List>
  )
}

function Gap() {
  return <div className="list-item !min-h-0 justify-center !py-1 faint bold" aria-hidden>…</div>
}
