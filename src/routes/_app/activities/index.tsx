import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ActivitiesPage } from '@/modules/activities/pages/ActivitiesPage'

export const Route = createFileRoute('/_app/activities/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Activities' },
  component: ActivitiesPage,
})
