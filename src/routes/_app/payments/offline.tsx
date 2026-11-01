import { createFileRoute } from '@tanstack/react-router'

import { OfflinePaymentPage } from '@/modules/payments/pages/OfflinePaymentPage'

export const Route = createFileRoute('/_app/payments/offline')({
  staticData: { title: 'Offline payment', backTo: '/payments' },
  component: OfflinePaymentPage,
})
