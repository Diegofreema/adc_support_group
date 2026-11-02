import { Link } from '@tanstack/react-router'

import { IconTile, List, ListItem, SectionTitle, StatusChip } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { useChapterActivities } from '../hooks/use-chapters'
import { activityTypeIcon } from '@/config/activity-types'

/** Latest activities from this chapter. */
export function ChapterActivities({ chapterId }: { chapterId: string }) {
  const { data: activities = [] } = useChapterActivities(chapterId)
  return (
    <section>
      <SectionTitle title="Recent" className="lg:!mt-0" action={<Link to="/activities">See all</Link>} />
      {activities.length === 0 ? <p className="muted small">Nothing yet.</p> : (
        <List>
          {activities.map((activity) => (
            <ListItem
              key={activity.id}
              to="/activities"
              leading={<IconTile icon={activityTypeIcon(activity.type)} />}
              title={activity.title}
              meta={`${formatDay(activity.date)} · ${activity.reach}`}
              trailing={<StatusChip status={activity.status} />}
            />
          ))}
        </List>
      )}
    </section>
  )
}
