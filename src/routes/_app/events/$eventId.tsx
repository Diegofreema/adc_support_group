import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { EventDetailPage } from '@/modules/events/pages/EventDetailPage'

export const Route = createFileRoute('/_app/events/$eventId')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Event', backTo: '/events' },
  component: EventDetailPage,
})
