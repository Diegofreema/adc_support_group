import { createFileRoute } from '@tanstack/react-router'

import { CheckinPage } from '@/modules/events/pages/CheckinPage'

/** Opened from the venue QR. No group guard: the backend says plainly if the code isn't theirs. */
export const Route = createFileRoute('/_app/events/checkin/$code')({
  staticData: { title: 'Check in', backTo: '/events' },
  component: CheckinPage,
})
