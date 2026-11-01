import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@/modules/directorate/dashboard/pages/DashboardPage'

export const Route = createFileRoute('/admin/')({
  staticData: { title: 'Overview' },
  component: DashboardPage,
})
