import { List, SectionTitle } from '@/components/shared'
import type { NotificationSectionData } from '../types/notification.types'
import { NotificationItem } from './NotificationItem'

export function NotificationSection({ section }: { section: NotificationSectionData }) {
  return (
    <>
      <SectionTitle title={section.title} />
      <List>
        {section.items.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </List>
    </>
  )
}
