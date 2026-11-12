import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { causeTotalsQuery, confirmOfflinePayment, overLimitQuery, paidTotalsQuery, paymentsQuery, proofUrlQuery, rejectOfflinePayment, waitingOfflineQuery } from '../services/payments.service'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import { directorateKeys } from '../../shared/query-keys'
import { paymentTotals } from '../utils/totals'
import { notify } from '@/lib/toast'
import type { PaymentsTab } from '../types'

/**
 * The payments screen: header numbers and tab counts always; a tab's own list
 * only while that tab is open ("To confirm" is both a count and a list).
 * The `*Loading` flags are true only on a first load, so a page can tell "loading" from "empty".
 */
export function usePaymentsOverview(tab: PaymentsTab) {
  const paging = usePaging('all')
  const list = useQuery({ ...paymentsQuery(paging.pageSize, paging.offset), placeholderData: keepPreviousData, enabled: tab === 'all' })
  useKeepPageInRange(paging, list.data?.total)
  const waiting = useQuery(waitingOfflineQuery)
  const paidQuery = useQuery(paidTotalsQuery)
  const paid = paidQuery.data
  const causes = useQuery({ ...causeTotalsQuery, enabled: tab === 'by-cause' })
  const waitingRows = waiting.data ?? []
  return {
    payments: list.data?.rows ?? [], paymentCount: paid?.allCount ?? list.data?.total, paging,
    waiting: waitingRows, waitingCount: waiting.data?.length, causes: causes.data ?? [],
    totals: paid && waiting.data && paymentTotals(paid, waitingRows),
    totalsLoading: paidQuery.isLoading || waiting.isLoading, paymentsLoading: list.isLoading, waitingLoading: waiting.isLoading, causesLoading: causes.isLoading,
  }
}

/** Payments that went past the payer's yearly giving limit, paged. */
export function useOverLimitPayments() {
  const paging = usePaging('over-limit')
  const query = useQuery({ ...overLimitQuery(paging.pageSize, paging.offset), placeholderData: keepPreviousData })
  const page = query.data
  useKeepPageInRange(paging, page?.total)
  return { rows: page?.rows ?? [], total: page?.total ?? 0, count: page?.total, limit: page?.limit ?? null, paging, isLoading: query.isLoading }
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
