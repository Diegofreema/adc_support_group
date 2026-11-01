import { createFileRoute } from '@tanstack/react-router'

import { PaymentsPage } from '@/modules/payments/pages/PaymentsPage'

export const Route = createFileRoute('/_app/payments/')({
  staticData: { title: 'Payments' },
  component: PaymentsPage,
})
