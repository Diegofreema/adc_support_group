import { createFileRoute } from '@tanstack/react-router'

import { CausesPage } from '@/modules/directorate/causes/pages/CausesPage'

export const Route = createFileRoute('/admin/causes')({
  staticData: { title: 'Causes', backTo: '/admin/more' },
  component: CausesPage,
})
