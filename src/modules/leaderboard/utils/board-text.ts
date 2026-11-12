import { formatDay, formatNumber } from '@/lib/format'
import type { BoardMeasure, BoardRow } from '../types/leaderboard.types'

/** "12 Nov" for a 'YYYY-MM-DD' snapshot date, read at midday so no time zone shifts the day. */
export function snapshotDay(snapshotOn: string): string {
  return formatDay(`${snapshotOn}T12:00:00`)
}

/** "in Lagos", "among groups abroad", "among national groups". */
export function boardPhrase(boardName: string): string {
  if (boardName === 'Abroad') return 'among groups abroad'
  if (boardName === 'National') return 'among national groups'
  return `in ${boardName}`
}

/** The number a row is ranked by. */
export function measureValue(row: BoardRow, measure: BoardMeasure): number {
  return measure === 'people' ? row.people : row.activities
}

/** "12" + "activities" / "people" under it. */
export function measureCount(row: BoardRow, measure: BoardMeasure): string {
  return formatNumber(measureValue(row, measure))
}

export const MEASURE_UNIT: Record<BoardMeasure, string> = { activities: 'activities', people: 'people' }

/** A gentle nudge under the board; never about being low. */
export const MEASURE_TIP: Record<BoardMeasure, string> = {
  activities: 'Every approved activity moves your group up.',
  people: 'Reach more people at your activities to move up.',
}
