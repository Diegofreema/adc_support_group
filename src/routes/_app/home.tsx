import { createFileRoute } from '@tanstack/react-router'

import { requireGroup } from '@/lib/route-guards'
import { HomePage } from '@/modules/home/pages/HomePage'

export const Route = createFileRoute('/_app/home')({
  staticData: { title: 'Home' },
  beforeLoad: requireGroup,
  component: HomePage,
})
