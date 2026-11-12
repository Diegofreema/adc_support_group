import { useMutation, useQueryClient } from '@tanstack/react-query'

import { reportOfflinePayment, startFunzPayment } from '../services/payments.service'
import { paymentKeys } from './use-payments'
import type { OfflinePaymentInput, PayDraft } from '../types'

function useInvalidatePayments() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: paymentKeys.all })
}

/** Starts the Funz checkout and sends the browser there; Funz returns the payer to /payments/<id>?ref=…. */
export function usePayWithFunz() {
  return useMutation({
    mutationFn: (draft: PayDraft) => startFunzPayment(draft),
    onSuccess: (checkout) => window.location.assign(checkout.paymentUrl),
  })
}

export function useReportOfflinePayment() {
  const invalidate = useInvalidatePayments()
  return useMutation({ mutationFn: (input: OfflinePaymentInput) => reportOfflinePayment(input), onSuccess: invalidate })
}
