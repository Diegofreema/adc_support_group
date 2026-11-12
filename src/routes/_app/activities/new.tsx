import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { RecordActivityPage } from '@/modules/activities/pages/RecordActivityPage'

export const Route = createFileRoute('/_app/activities/new')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Record activity', backTo: '/activities' },
  component: RecordActivityPage,
})
