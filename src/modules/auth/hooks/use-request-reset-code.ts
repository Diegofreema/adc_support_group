import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { requestPasswordReset, type ChannelChoices, type CodeChannel } from '../services/verification.service'
import { requestCodeSchema, type RequestCodeValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

export interface CodeSent {
  phone: string
  challengeId: string
  channel: CodeChannel
}

/**
 * Phone → "Send code". When the account has email and phone, the backend
 * sends nothing and asks which; the person picks and it's sent again.
 * Used by "Forgot password" and the welcome link for imported members.
 */
export function useRequestResetCode(initialPhone: string, onSent: (sent: CodeSent) => void) {
  const form = useForm<RequestCodeValues>({ resolver: zodResolver(requestCodeSchema), defaultValues: { phone: initialPhone } })
  const [channels, setChannels] = useState<ChannelChoices | null>(null)
  const mutation = useMutation({
    mutationFn: ({ phone, channel }: { phone: string; channel?: CodeChannel }) => requestPasswordReset(phone, channel),
    onSuccess: (result, { phone }) => {
      if (result.kind === 'choose') {
        setChannels(result.channels)
        return
      }
      setChannels(null)
      notify(result.channel === 'email' ? 'Code sent to your email' : `Code sent to ${result.challenge.sentTo}`)
      onSent({ phone, challengeId: result.challenge.challengeId, channel: result.channel })
    },
  })
  return {
    form,
    /** Set when the person must choose where the code goes. */
    channels,
    isPending: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate({ phone: values.phone.trim() })),
    sendVia: (channel: CodeChannel) => mutation.mutate({ phone: form.getValues('phone').trim(), channel }),
    /** Editing the phone again drops a stale channel choice. */
    resetChoice: () => setChannels(null),
  }
}
