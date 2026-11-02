import { useState } from 'react'

import { useRejectActivity } from './use-activity-review'
import { useReasonForm } from '../../shared/hooks/use-reason-form'
import { reasonMessage } from '../../shared/utils/reasons'
import { ACTIVITY_REJECT_REASONS } from '../utils/reasons'

/** One reason dialog shared by every card/row; remembers which activity it is for. */
export function useRejectActivityFlow() {
  const [targetId, setTargetId] = useState<string | null>(null)
  const form = useReasonForm()
  const reject = useRejectActivity()
  const close = () => { setTargetId(null); form.reset() }
  const submit = () => {
    if (targetId) reject.mutate({ id: targetId, reason: reasonMessage(ACTIVITY_REJECT_REASONS, form.value) }, { onSuccess: close })
  }
  return { isOpen: targetId !== null, openFor: setTargetId, setOpen: (open: boolean) => !open && close(), form, submit }
}
