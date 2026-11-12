import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { PayPage } from '@/modules/payments/pages/PayPage'

export const Route = createFileRoute('/_app/payments/new')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Pay', backTo: '/payments' },
  component: PayPage,
})
