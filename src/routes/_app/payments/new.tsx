import { createFileRoute } from '@tanstack/react-router'

import { PayPage } from '@/modules/payments/pages/PayPage'

export const Route = createFileRoute('/_app/payments/new')({
  staticData: { title: 'Pay', backTo: '/payments' },
  component: PayPage,
})
