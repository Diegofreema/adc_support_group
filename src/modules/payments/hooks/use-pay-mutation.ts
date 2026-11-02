import { useMutation, useQueryClient } from '@tanstack/react-query'

import { payWithFunz, reportOfflinePayment } from '../services/payments.service'
import { paymentKeys } from './use-payments'
import { useRequiredUser } from '@/stores/session-store'
import type { OfflinePaymentInput, PayDraft } from '../types'

function useInvalidatePayments() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: paymentKeys.all })
}

export function usePayWithFunz() {
  const user = useRequiredUser()
  const invalidate = useInvalidatePayments()
  return useMutation({ mutationFn: (draft: PayDraft) => payWithFunz(draft, user), onSuccess: invalidate })
}

export function useReportOfflinePayment() {
  const user = useRequiredUser()
  const invalidate = useInvalidatePayments()
  return useMutation({ mutationFn: (input: OfflinePaymentInput) => reportOfflinePayment(input, user), onSuccess: invalidate })
}
