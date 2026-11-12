import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { buttonClassName, ErrorState, PageHeader, PageLoader, Tabs } from '@/components/shared'
import { EventList } from '../components/EventList'
import { LoadMoreButton } from '../components/LoadMoreButton'
import { useEventRsvp } from '../hooks/use-event-rsvp'
import { useEventTabs } from '../hooks/use-event-tabs'

type View = ReturnType<typeof useEventTabs>

export function EventsPage() {
  const view = useEventTabs()
  return (
    <>
      <PageHeader title="Events" actions={view.canCreate && <NewEventLink />} />
      <Tabs tabs={view.tabs} value={view.tab} onChange={view.setTab} label="Events" />
      <div className="mt-5"><EventsBody view={view} /></div>
    </>
  )
}

function EventsBody({ view }: { view: View }) {
  const rsvp = useEventRsvp()
  if (view.isLoading) return <PageLoader />
  if (view.error) return <ErrorState title="Could not load events" error={view.error} onRetry={view.retry} />
  return (
    <>
      <EventList events={view.events} emptyTitle={view.tab === 'upcoming' ? 'No events coming up' : 'No past events'} onAnswer={rsvp.answer} pendingId={rsvp.pendingId} />
      <LoadMoreButton hasMore={view.hasMore} loading={view.isLoadingMore} onClick={view.loadMore} />
    </>
  )
}

function NewEventLink() {
  return (
    <Link to="/events/new" className={buttonClassName('primary')}>
      <Plus className="i" aria-hidden />New event
    </Link>
  )
}
