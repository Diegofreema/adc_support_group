import type { RankedEntry } from '../../shared/components/RankedList'
import type { GroupScore, ScoreMetric } from '../types'
import { formatNairaShort, formatNumber } from '@/lib/format'

const FORMATTERS: Record<ScoreMetric, (value: number) => string> = {
  activities: formatNumber,
  members: formatNumber,
  money: formatNairaShort,
}

/** Top N groups for a metric, formatted for display. */
export function rankGroups(groups: GroupScore[], metric: ScoreMetric, limit = 4): RankedEntry[] {
  return [...groups]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, limit)
    .map((group) => ({ id: group.id, name: group.name, value: FORMATTERS[metric](group[metric]) }))
}

