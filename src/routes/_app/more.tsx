import { createFileRoute } from '@tanstack/react-router'

import { MorePage } from '@/modules/profile/pages/MorePage'

export const Route = createFileRoute('/_app/more')({
  staticData: { title: 'More' },
  component: MorePage,
})
