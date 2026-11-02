import type { SegmentOption } from '@/components/shared'
import type { ChapterLevel } from '../types'

export const LEVEL_OPTIONS: SegmentOption<ChapterLevel>[] = [
  { value: 'state', label: 'State' },
  { value: 'lga', label: 'LGA' },
  { value: 'ward', label: 'Ward' },
]
