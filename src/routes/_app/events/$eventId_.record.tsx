import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { RecordEventPage } from '@/modules/events/pages/RecordEventPage'

export const Route = createFileRoute('/_app/events/$eventId_/record')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Make it an activity', backTo: '/events' },
  component: RecordEventPage,
})
