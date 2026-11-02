import { createFileRoute } from '@tanstack/react-router'

import { ChaptersPage } from '@/modules/chapters/pages/ChaptersPage'

export const Route = createFileRoute('/_app/chapters/')({
  staticData: { title: 'Chapters' },
  component: ChaptersPage,
})
