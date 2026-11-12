import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { causeTotalsQuery, confirmOfflinePayment, paidTotalsQuery, paymentsQuery, proofUrlQuery, rejectOfflinePayment, waitingOfflineQuery } from '../services/payments.service'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import { directorateKeys } from '../../shared/query-keys'
import { paymentTotals } from '../utils/totals'
import { notify } from '@/lib/toast'

/** Everything the payments screen shows. */
export function usePaymentsOverview() {
  const paging = usePaging('all')
  const list = useQuery({ ...paymentsQuery(paging.pageSize, paging.offset), placeholderData: keepPreviousData }).data
  useKeepPageInRange(paging, list?.total)
  const waiting = useQuery(waitingOfflineQuery).data ?? []
  const paid = useQuery(paidTotalsQuery).data
  const causes = useQuery(causeTotalsQuery).data ?? []
  return { payments: list?.rows ?? [], paymentCount: list?.total ?? 0, paging, waiting, causes, totals: paid && paymentTotals(paid, waiting) }
}

/** Signed link to a payment's proof image (private bucket). */
export function useProofUrl(path: string | undefined) {
  return useQuery({ ...proofUrlQuery(path ?? ''), enabled: Boolean(path) })
}

function usePaymentMutation<Args>(fn: (args: Args) => Promise<unknown>, message: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.payments() })
      queryClient.invalidateQueries({ queryKey: directorateKeys.causes() })
      queryClient.invalidateQueries({ queryKey: [...directorateKeys.all, 'dashboard'] })
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
