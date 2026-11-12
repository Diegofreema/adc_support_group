import { getRouteApi } from '@tanstack/react-router'

import { Banner, ErrorState, PageLoader } from '@/components/shared'
import { AttendanceCounts } from '../components/AttendanceCounts'
import { AttendanceFilters } from '../components/AttendanceFilters'
import { AttendanceList } from '../components/AttendanceList'
import { LoadMoreButton } from '@/components/shared'
import { useAttendance } from '../hooks/use-attendance'
import { useEvent } from '../hooks/use-events'
import { useMarkPresent } from '../hooks/use-mark-present'
import { attendanceOpen, eventWhenLabel } from '../utils/event-time'
import type { GroupEvent } from '../types'

const routeApi = getRouteApi('/_app/events/$eventId_/attendance')

/** Why the boxes are locked, if they are. */
function lockReason(event: GroupEvent): string | undefined {
  if (event.status === 'cancelled') return 'This event was cancelled.'
  if (event.activityId) return 'This event is now an activity. Attendance is closed.'
  if (!attendanceOpen(event.startsAt)) return 'You can tick people from an hour before the start.'
  return undefined
}

export function AttendancePage() {
  const { eventId } = routeApi.useParams()
  const { data: event, error, refetch } = useEvent(eventId)
  if (error && !event) return <ErrorState title="Could not load this event" error={error} onRetry={() => void refetch()} />
  if (!event) return <PageLoader />
  return <Attendance event={event} />
}

function Attendance({ event }: { event: GroupEvent }) {
  const view = useAttendance(event.id)
  const mark = useMarkPresent(event.id)
  const locked = lockReason(event)
  return (
    <>
      <h1 className="h1">Attendance</h1>
      <p className="muted mt-1">{event.title} · {eventWhenLabel(event.startsAt, event.endsAt)}</p>
      {view.counts && <div className="mt-5"><AttendanceCounts coming={view.counts.coming} present={view.counts.present} /></div>}
      {locked && <Banner tone="info" className="mt-4">{locked}</Banner>}
      <div className="mt-5"><AttendanceFilters filter={view.filter} onFilter={view.setFilter} search={view.search} onSearch={view.setSearch} /></div>
      <div className="mt-4">
        {view.isLoading ? <PageLoader /> : view.error ? <ErrorState title="Could not load the list" error={view.error} onRetry={view.retry} /> : (
          <AttendanceList people={view.people} disabled={Boolean(locked)} onMark={mark} />
        )}
      </div>
      <LoadMoreButton hasMore={view.hasMore} loading={view.isLoadingMore} onClick={view.loadMore} />
    </>
  )
}
