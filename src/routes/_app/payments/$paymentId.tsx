import { createFileRoute } from '@tanstack/react-router'

import { ReceiptPage } from '@/modules/payments/pages/ReceiptPage'

export const Route = createFileRoute('/_app/payments/$paymentId')({
  staticData: { title: 'Receipt', backTo: '/payments' },
  component: ReceiptPage,
})
