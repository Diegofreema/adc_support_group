import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { PaymentsPage } from '@/modules/payments/pages/PaymentsPage'

export const Route = createFileRoute('/_app/payments/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Payments' },
  component: PaymentsPage,
})
