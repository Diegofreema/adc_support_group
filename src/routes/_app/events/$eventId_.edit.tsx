import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { EditEventPage } from '@/modules/events/pages/EditEventPage'

export const Route = createFileRoute('/_app/events/$eventId_/edit')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Edit event', backTo: '/events' },
  component: EditEventPage,
})
