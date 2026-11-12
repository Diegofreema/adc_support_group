import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { EventsPage } from '@/modules/events/pages/EventsPage'

export const Route = createFileRoute('/_app/events/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Events' },
  component: EventsPage,
})
