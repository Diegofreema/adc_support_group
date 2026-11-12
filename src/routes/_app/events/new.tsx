import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { NewEventPage } from '@/modules/events/pages/NewEventPage'

export const Route = createFileRoute('/_app/events/new')({
  beforeLoad: requirePower('events'),
  staticData: { title: 'New event', backTo: '/events' },
  component: NewEventPage,
})
