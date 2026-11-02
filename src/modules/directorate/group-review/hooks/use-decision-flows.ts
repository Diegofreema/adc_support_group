import { useState } from 'react'

import { useGroupDecisions } from './use-groups'
import { useReasonForm } from '../../shared/hooks/use-reason-form'
import { reasonMessage } from '../../shared/utils/reasons'
import { REJECT_REASONS, SUSPEND_REASONS } from '../utils/reasons'
import { useDisclosure } from '@/hooks/use-disclosure'

/** Reject: pick a reason, the leader reads it. */
export function useRejectFlow(groupId: string) {
  const dialog = useDisclosure()
  const form = useReasonForm()
  const { reject } = useGroupDecisions(groupId)
  const submit = () => reject.mutate(reasonMessage(REJECT_REASONS, form.value), { onSuccess: dialog.close })
  return { dialog, form, submit }
}

/** Suspend a verified group with a reason. */
export function useSuspendFlow(groupId: string) {
  const dialog = useDisclosure()
  const form = useReasonForm()
  const { suspend } = useGroupDecisions(groupId)
  const submit = () => suspend.mutate(reasonMessage(SUSPEND_REASONS, form.value), { onSuccess: dialog.close })
  return { dialog, form, submit }
}

/** Ask the leader for more information. */
export function useAskInfoFlow(groupId: string) {
  const dialog = useDisclosure()
  const [message, setMessage] = useState('')
  const { askInfo } = useGroupDecisions(groupId)
  const submit = () => askInfo.mutate(message.trim(), { onSuccess: () => { setMessage(''); dialog.close() } })
  return { dialog, message, setMessage, canSend: message.trim().length > 2, submit }
}
