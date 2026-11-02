import { createFileRoute } from '@tanstack/react-router'

import { MorePage } from '@/modules/directorate/more/pages/MorePage'

export const Route = createFileRoute('/admin/more')({
  staticData: { title: 'More' },
  component: MorePage,
})
