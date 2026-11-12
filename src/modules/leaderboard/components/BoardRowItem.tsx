import { GroupMark, ThumbImage } from '@/components/shared'
import { cn } from '@/lib/utils'
import { MEASURE_UNIT, measureCount } from '../utils/board-text'
import type { BoardMeasure, BoardRow } from '../types/leaderboard.types'

const MINE_CLASS = 'bg-[var(--green-soft)] shadow-[inset_4px_0_0_var(--green)]'

/** Place, group picture, name, and the number it is ranked by. The caller's group is tinted and says so. */
export function BoardRowItem({ row, measure }: { row: BoardRow; measure: BoardMeasure }) {
  return (
    <div className={cn('list-item', row.isMine && MINE_CLASS)} aria-current={row.isMine || undefined}>
      <span className="num bold w-8 shrink-0 text-center">{row.place}</span>
      <GroupPicture row={row} />
      <span className="grow min-w-0">
        <span className="title truncate block">{row.name}</span>
        {row.isMine && <span className="block small green bold">Your group</span>}
      </span>
      <span className="text-right shrink-0">
        <span className="amount block">{measureCount(row, measure)}</span>
        <span className="meta block">{MEASURE_UNIT[measure]}</span>
      </span>
    </div>
  )
}

function GroupPicture({ row }: { row: BoardRow }) {
  if (!row.photoUrl) return <GroupMark name={row.name} className="!h-10 !w-10 !text-[0.8125rem]" />
  return <ThumbImage src={row.photoUrl} className="h-10 w-10 shrink-0 rounded-[var(--r)] object-cover" />
}
