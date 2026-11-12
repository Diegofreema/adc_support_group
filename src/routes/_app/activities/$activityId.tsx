import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ActivityDetailPage } from '@/modules/activities/pages/ActivityDetailPage'

export const Route = createFileRoute('/_app/activities/$activityId')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Activity', backTo: '/activities' },
  component: ActivityDetailPage,
})
