import { createFileRoute } from '@tanstack/react-router'

import { ReportsPage } from '@/modules/directorate/reports/pages/ReportsPage'

export const Route = createFileRoute('/admin/reports')({
  staticData: { title: 'Reports', backTo: '/admin/more' },
  component: ReportsPage,
})
