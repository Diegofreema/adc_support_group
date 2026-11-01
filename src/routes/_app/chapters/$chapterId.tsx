import { createFileRoute } from '@tanstack/react-router'

import { ChapterPage } from '@/modules/chapters/pages/ChapterPage'

export const Route = createFileRoute('/_app/chapters/$chapterId')({
  staticData: { title: 'Chapter', backTo: '/chapters' },
  component: ChapterPage,
})
