import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { OfflinePaymentPage } from '@/modules/payments/pages/OfflinePaymentPage'

export const Route = createFileRoute('/_app/payments/offline')({
  beforeLoad: requirePower('money'),
  staticData: { title: 'Offline payment', backTo: '/payments' },
  component: OfflinePaymentPage,
})
