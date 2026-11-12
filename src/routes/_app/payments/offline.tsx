import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { OfflinePaymentPage } from '@/modules/payments/pages/OfflinePaymentPage'

export const Route = createFileRoute('/_app/payments/offline')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Offline payment', backTo: '/payments' },
  component: OfflinePaymentPage,
})
