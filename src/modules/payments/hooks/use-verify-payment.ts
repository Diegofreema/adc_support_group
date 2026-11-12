import { useQuery, useQueryClient } from '@tanstack/react-query'

import { verifyFunzPayment } from '../services/payments.service'
import { paymentKeys } from './use-payments'

const POLL_MS = 4_000
const MAX_CHECKS = 8

/**
 * When Funz sends the payer back (?ref=…), ask it how the payment went and
 * keep asking a few times while it is still being checked. Once it settles,
 * the receipt reloads.
 */
export function useVerifyPayment(reference: string | undefined) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['payment-verify', reference],
    enabled: Boolean(reference),
    retry: false,
    staleTime: Infinity,
    queryFn: async () => {
      const check = await verifyFunzPayment(reference!)
      if (check.status !== 'checking') await queryClient.invalidateQueries({ queryKey: paymentKeys.all })
      return check
    },
    refetchInterval: (query) => {
      const check = query.state.data
      const keepChecking = check?.status === 'checking' && !check.expired && query.state.dataUpdateCount < MAX_CHECKS
      return keepChecking ? POLL_MS : false
    },
  })
}
