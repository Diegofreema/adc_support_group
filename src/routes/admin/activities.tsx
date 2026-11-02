import { createFileRoute } from '@tanstack/react-router'

import { ActivityReviewPage } from '@/modules/directorate/activity-review/pages/ActivityReviewPage'

export const Route = createFileRoute('/admin/activities')({
  staticData: { title: 'Activities' },
  component: ActivityReviewPage,
})
