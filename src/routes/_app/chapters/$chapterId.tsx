import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ChapterPage } from '@/modules/chapters/pages/ChapterPage'

export const Route = createFileRoute('/_app/chapters/$chapterId')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Chapter', backTo: '/chapters' },
  component: ChapterPage,
})
