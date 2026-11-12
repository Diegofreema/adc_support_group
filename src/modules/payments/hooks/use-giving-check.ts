import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { checkGiving } from '../services/payments.service'
import { paymentKeys } from './use-payments'

const DEBOUNCE_MS = 400

function useDebounced<T>(value: T): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [value])
  return debounced
}

/** The yearly giving limit check for the amount being typed (and the payer, when recording for someone else). */
export function useGivingCheck(amount: number, payerId?: string) {
  const debouncedAmount = useDebounced(amount)
  const debouncedPayer = useDebounced(payerId)
  return useQuery({
    queryKey: paymentKeys.giving(debouncedAmount, debouncedPayer),
    queryFn: () => checkGiving(debouncedAmount, debouncedPayer),
    placeholderData: keepPreviousData,
  }).data
}
