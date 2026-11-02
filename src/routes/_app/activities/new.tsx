import { createFileRoute } from '@tanstack/react-router'

import { RecordActivityPage } from '@/modules/activities/pages/RecordActivityPage'

export const Route = createFileRoute('/_app/activities/new')({
  staticData: { title: 'Record activity', backTo: '/activities' },
  component: RecordActivityPage,
})
