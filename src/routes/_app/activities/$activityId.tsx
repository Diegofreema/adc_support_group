import { createFileRoute } from '@tanstack/react-router'

import { ActivityDetailPage } from '@/modules/activities/pages/ActivityDetailPage'

export const Route = createFileRoute('/_app/activities/$activityId')({
  staticData: { title: 'Activity', backTo: '/activities' },
  component: ActivityDetailPage,
})
