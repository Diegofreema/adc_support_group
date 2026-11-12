import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ChaptersPage } from '@/modules/chapters/pages/ChaptersPage'

export const Route = createFileRoute('/_app/chapters/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Chapters' },
  component: ChaptersPage,
})
