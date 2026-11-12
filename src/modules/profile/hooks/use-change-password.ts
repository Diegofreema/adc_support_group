import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  completePasswordChange, startPasswordChange,
  type ChannelChoice, type CodeChannel, type PasswordChallenge, type StartPasswordChange,
} from '../services/profile.service'
import { changePasswordSchema, type ChangePasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'

/** Send a code (asking email or SMS when the account has both), then the code + new password. */
export function useChangePassword(onDone: () => void) {
  const user = useRequiredUser()
  const [challenge, setChallenge] = useState<PasswordChallenge | null>(null)
  const [channels, setChannels] = useState<ChannelChoice | null>(null)
  const [channel, setChannel] = useState<CodeChannel>('email')
  const form = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema), defaultValues: { code: '', next: '' } })
  const onStarted = (result: StartPasswordChange) => {
    if (result.kind === 'choose') setChannels(result.channels)
    else setChallenge(result.challenge)
  }
  const send = useMutation({
    mutationFn: () => startPasswordChange(channels ? channel : undefined, channels ?? undefined),
    onSuccess: onStarted,
    meta: { inlineError: true },
  })
  const save = useMutation({
    mutationFn: (values: ChangePasswordValues) => completePasswordChange(challenge!.challengeId, values.code, values.next, user.phone || user.email || ''),
    onSuccess: () => {
      notify('Password changed')
      reset()
      onDone()
    },
    meta: { inlineError: true },
  })

  function reset() {
    form.reset()
    setChallenge(null)
    setChannels(null)
    setChannel('email')
    send.reset()
    save.reset()
  }

  return {
    form,
    challenge,
    channels, channel, setChannel,
    sendCode: () => send.mutate(),
    onSubmit: form.handleSubmit((values) => save.mutate(values)),
    reset,
    isPending: send.isPending || save.isPending,
    error: (save.error ?? send.error)?.message,
  }
}
