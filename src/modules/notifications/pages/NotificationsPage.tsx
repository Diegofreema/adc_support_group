import { BellOff } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import { NotificationFilters } from '../components/NotificationFilters'
import { NotificationSection } from '../components/NotificationSection'
import { NotificationsHeader } from '../components/NotificationsHeader'
import { useMarkAllRead, useNotifications } from '../hooks/use-notifications'

export function NotificationsPage() {
  const { filter, setFilter, sections, unread, isLoading } = useNotifications()
  const markAllRead = useMarkAllRead()
  return (
    <div className="main-narrow mx-auto">
      <NotificationsHeader unread={unread} onMarkRead={() => markAllRead.mutate()} />
      <NotificationFilters value={filter} onChange={setFilter} />
      {sections.map((section) => (
        <NotificationSection key={section.day} section={section} />
      ))}
      {!isLoading && sections.length === 0 && <EmptyState icon={BellOff} title="Nothing here" />}
    </div>
  )
}
