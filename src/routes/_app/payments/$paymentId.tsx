import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ReceiptPage } from '@/modules/payments/pages/ReceiptPage'

export const Route = createFileRoute('/_app/payments/$paymentId')({
  beforeLoad: requireVerifiedGroup,
  /** Funz sends the payer back with ?ref=<reference>. */
  validateSearch: (search: Record<string, unknown>): { ref?: string } => ({
    ref: typeof search.ref === 'string' && search.ref ? search.ref : undefined,
  }),
  staticData: { title: 'Receipt', backTo: '/payments' },
  component: ReceiptPage,
})
