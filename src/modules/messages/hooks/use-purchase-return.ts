import { useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { messageKeys, usePurchaseStatus } from './use-messages'
import type { PointsPurchase } from '../types'
import { notify } from '@/lib/toast'

function purchaseParam(search: unknown): string | null {
  const value = (search as Record<string, unknown> | undefined)?.purchase
  return typeof value === 'string' && value ? value : null
}

function announce(result: PointsPurchase): void {
  if (result.status === 'confirmed') notify('Points added')
  else if (result.status === 'failed') notify(result.expired ? 'The payment expired' : 'The payment did not go through', 'error')
  else notify('Payment still clearing. Your points will show soon.')
}

/**
 * Funz sends the buyer back to /messages?purchase=<ref>. Check the purchase,
 * say how it went once, then drop the param from the address.
 */
export function usePurchaseReturn() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const fromUrl = useLocation({ select: (location) => purchaseParam(location.search) })
  const [reference] = useState(fromUrl)
  const { data, error } = usePurchaseStatus(reference)
  const announced = useRef(false)

  useEffect(() => {
    if (announced.current || (!data && !error)) return
    announced.current = true
    if (error) notify(error.message, 'error')
    else if (data) announce(data)
    void queryClient.invalidateQueries({ queryKey: messageKeys.points() })
    void navigate({ to: '/messages', replace: true })
  }, [data, error, navigate, queryClient])

  return { checking: !!reference && !data && !error }
}
