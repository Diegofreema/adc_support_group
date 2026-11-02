import { createFileRoute } from '@tanstack/react-router'

import { ActivitiesPage } from '@/modules/activities/pages/ActivitiesPage'

export const Route = createFileRoute('/_app/activities/')({
  staticData: { title: 'Activities' },
  component: ActivitiesPage,
})
