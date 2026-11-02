import { useState } from 'react'

import { canSend, needsPoints, recipientsFor } from '../utils/compose'
import { smsCost } from '../utils/sms-cost'
import { useAudiences, usePointsBalance, useSendMessage } from './use-messages'
import { formatNumber } from '@/lib/format'
import { notify } from '@/lib/toast'
import type { Audience, Channel } from '../types'

/** New message form: choices, live SMS cost, and send. */
export function useComposeMessage() {
  const audiences = useAudiences().data ?? []
  const balance = usePointsBalance().data ?? 0
  const send = useSendMessage()
  const [audience, setAudience] = useState<Audience>('all')
  const [channel, setChannel] = useState<Channel>('free')
  const [body, setBody] = useState('')

  const recipients = recipientsFor(audiences, audience)
  const cost = smsCost(body, recipients, balance)

  const submit = () => {
    if (!canSend(body, recipients)) return notify('Type a message first', 'error')
    send.mutate({ audience, channel, body, recipients }, {
      onSuccess: () => { setBody(''); notify(`Sent to ${formatNumber(recipients)}`) },
    })
  }

  return {
    audiences, audience, setAudience, channel, setChannel, body, setBody,
    balance, cost, needsPoints: needsPoints(channel, cost), submit, isSending: send.isPending,
  }
}
