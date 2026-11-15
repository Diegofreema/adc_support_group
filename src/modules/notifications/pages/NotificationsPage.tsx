import { BellOff } from 'lucide-react'

import { EmptyState, ErrorState, SkeletonList } from '@/components/shared'
import { NotificationFilters } from '../components/NotificationFilters'
import { NotificationSection } from '../components/NotificationSection'
import { NotificationsHeader } from '../components/NotificationsHeader'
import { useMarkAllRead, useNotifications } from '../hooks/use-notifications'

export function NotificationsPage() {
  const { filter, setFilter, sections, unread, isLoading, error, retry } = useNotifications()
  const markAllRead = useMarkAllRead()
  return (
    <div className="main-narrow mx-auto">
      <NotificationsHeader unread={unread} onMarkRead={() => markAllRead.mutate()} />
      <NotificationFilters value={filter} onChange={setFilter} />
      {isLoading && <div className="mt-4"><SkeletonList rows={6} trailing={false} /></div>}
      {sections.map((section) => (
        <NotificationSection key={section.day} section={section} />
      ))}
      {error && <div className="mt-4"><ErrorState title="Couldn't load your notifications" error={error} onRetry={retry} /></div>}
      {!isLoading && !error && sections.length === 0 && <EmptyState icon={BellOff} title="No notifications yet" description="News about your activities, events and payments shows here." />}
    </div>
  )
}
