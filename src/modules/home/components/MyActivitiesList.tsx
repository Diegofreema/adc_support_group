import { Link } from '@tanstack/react-router'

import { IconTile, List, ListItem, SectionTitle, StatusChip } from '@/components/shared'
import type { MyActivity } from '../types/home.types'
import { activityTypeIcon } from '@/config/activity-types'
import { SentBackActivity } from './SentBackActivity'

export function MyActivitiesList({ activities }: { activities: MyActivity[] }) {
  return (
    <>
      <SectionTitle title="My activities" action={<Link to="/activities">See all</Link>} />
      <List>
        {activities.map((activity) => (
          <MyActivityRow key={activity.id} activity={activity} />
        ))}
      </List>
    </>
  )
}

function MyActivityRow({ activity }: { activity: MyActivity }) {
  if (activity.status === 'rejected') return <SentBackActivity activity={activity} />
  return (
    <ListItem to="/activities" title={activity.title} meta={activity.meta} leading={<IconTile icon={activityTypeIcon(activity.activityType)} />} trailing={<StatusChip status={activity.status} />} />
  )
}
