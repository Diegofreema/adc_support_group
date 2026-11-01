import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { baseTotalsQuery, causeTotalsQuery, confirmOfflinePayment, paymentsQuery, rejectOfflinePayment } from '../services/payments.service'
import { directorateKeys } from '../../shared/query-keys'
import { paymentTotals, waitingOffline } from '../utils/totals'
import { notify } from '@/lib/toast'

/** Everything the payments screen shows. */
export function usePaymentsOverview() {
  const payments = useQuery(paymentsQuery).data ?? []
  const base = useQuery(baseTotalsQuery).data
  const causes = useQuery(causeTotalsQuery).data ?? []
  return { payments, waiting: waitingOffline(payments), causes, totals: base && paymentTotals(base, payments) }
}

function usePaymentMutation<Args>(fn: (args: Args) => Promise<unknown>, message: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.payments() })
      notify(message)
    },
  })
}

export function useOfflineDecisions() {
  return {
    confirm: usePaymentMutation((id: string) => confirmOfflinePayment(id), 'Payment confirmed'),
    reject: usePaymentMutation(({ id, reason }: { id: string; reason: string }) => rejectOfflinePayment(id, reason), 'Payment rejected'),
  }
}
