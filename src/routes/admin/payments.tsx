import { createFileRoute } from '@tanstack/react-router'

import { PaymentsPage } from '@/modules/directorate/payments/pages/PaymentsPage'

export const Route = createFileRoute('/admin/payments')({
  staticData: { title: 'Payments' },
  component: PaymentsPage,
})
