import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { EditActivityPage } from '@/modules/activities/pages/EditActivityPage'

export const Route = createFileRoute('/_app/activities/$activityId_/edit')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Edit activity', backTo: '/activities' },
  component: EditActivityPage,
})
