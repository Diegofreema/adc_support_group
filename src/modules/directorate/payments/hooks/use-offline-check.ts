import { useState } from 'react'

import { useOfflineDecisions, useProofUrl } from './use-payments'
import { useReasonForm } from '../../shared/hooks/use-reason-form'
import { reasonMessage } from '../../shared/utils/reasons'
import { OFFLINE_REJECT_REASONS } from '../utils/labels'
import type { ReviewPayment } from '../types'

type Mode = 'check' | 'reject'

/** Open one offline payment, then confirm it or reject with a reason. */
export function useOfflineCheck() {
  const [payment, setPayment] = useState<ReviewPayment | null>(null)
  const [mode, setMode] = useState<Mode>('check')
  const form = useReasonForm()
  const { confirm, reject } = useOfflineDecisions()
  const proof = useProofUrl(payment?.proofPath)
  const close = () => { setPayment(null); setMode('check'); form.reset() }
  const confirmPayment = () => payment && confirm.mutate(payment.id, { onSuccess: close })
  const rejectPayment = () => payment && reject.mutate({ id: payment.id, reason: reasonMessage(OFFLINE_REJECT_REASONS, form.value) }, { onSuccess: close })
  const busy = confirm.isPending || reject.isPending
  return { payment, proofUrl: proof.data, proofLoading: proof.isLoading, mode, open: setPayment, close, startReject: () => setMode('reject'), form, confirmPayment, rejectPayment, busy }
}

export type OfflineCheck = ReturnType<typeof useOfflineCheck>
