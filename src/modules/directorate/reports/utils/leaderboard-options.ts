import type { SegmentOption, SelectOption } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { STATE_OPTIONS } from '../../shared/constants/options'
import type { BoardMeasure } from '../types'

/** Groups abroad and national groups sit on their own boards beside the states. */
export const BOARD_STATE_OPTIONS: SelectOption[] = [
  ...STATE_OPTIONS,
  { value: 'Abroad', label: 'Abroad' },
  { value: 'National', label: 'National' },
]

export const MEASURE_OPTIONS: SegmentOption<BoardMeasure>[] = [
  { value: 'activities', label: 'Most activities' },
  { value: 'people', label: 'Most people reached' },
]

/** "12 Nov" for a 'YYYY-MM-DD' snapshot date, read at midday so no time zone shifts the day. */
export function snapshotDay(snapshotOn: string): string {
  return formatDay(`${snapshotOn}T12:00:00`)
}
