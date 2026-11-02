import { useState } from 'react'

import { useApproveActivity, useRejectActivity } from './use-review-actions'
import type { RejectInput } from '../types'

/** Approve directly; reject goes through a reason dialog. */
export function useReviewQueue() {
  const approve = useApproveActivity()
  const reject = useRejectActivity()
  const [rejectingId, setRejectingId] = useState<string>()

  const confirmReject = (input: RejectInput) => {
    if (rejectingId) reject.mutate({ id: rejectingId, input })
    setRejectingId(undefined)
  }

  return {
    approve: (id: string) => approve.mutate(id),
    startReject: setRejectingId,
    closeReject: (open: boolean) => { if (!open) setRejectingId(undefined) },
    confirmReject,
    rejectingId,
    isBusy: approve.isPending || reject.isPending,
  }
}
