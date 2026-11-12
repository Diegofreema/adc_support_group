import { Link } from '@tanstack/react-router'
import { CircleX, RotateCw } from 'lucide-react'

import { Button, buttonClassName, ResultHeader } from '@/components/shared'
import type { GroupEvent } from '../types'

export function CheckinSuccess({ event }: { event: GroupEvent }) {
  return (
    <>
      <ResultHeader title="You’re checked in" subtitle={event.title} />
      <Link to="/events/$eventId" params={{ eventId: event.id }} className={`${buttonClassName('primary', 'lg', true)} mt-6`}>See the event</Link>
    </>
  )
}

/** The backend's words are already plain ("This event is closed"); a dropped connection says so. */
function plainMessage(error: Error): string {
  return /fetch|network|load failed/i.test(error.message) ? 'No connection. Try again.' : error.message
}

export function CheckinFailed({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <>
      <ResultHeader title="Not checked in" subtitle={plainMessage(error)} icon={CircleX} tone="red" />
      <div className="stack mt-6">
        <Button variant="primary" size="lg" block icon={RotateCw} onClick={onRetry}>Try again</Button>
        <Link to="/events" className={buttonClassName('secondary', 'lg', true)}>See events</Link>
      </div>
    </>
  )
}
