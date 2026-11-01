import type { KeyValue } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Activity } from '@/types/domain'

/** Detail rows; chapter only when there is one. */
export function activityInfoRows(activity: Activity): KeyValue[] {
  const rows: (KeyValue | false)[] = [
    { label: 'Group', value: activity.groupName },
    Boolean(activity.chapterName) && { label: 'Chapter', value: activity.chapterName },
    { label: 'Ward', value: activity.ward ?? '—' },
    { label: 'People', value: formatNumber(activity.peopleReached) },
    { label: 'By', value: activity.loggedBy },
  ]
  return rows.filter((row): row is KeyValue => Boolean(row))
}
