import { Card, KeyValueList } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { activityInfoRows } from '../utils/activity-info'

export function ActivityInfoCard({ activity }: { activity: Activity }) {
  return <Card><KeyValueList items={activityInfoRows(activity)} /></Card>
}
