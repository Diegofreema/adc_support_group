import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { completePasswordChange, startPasswordChange, type PasswordChallenge } from '../services/profile.service'
import { changePasswordSchema, type ChangePasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/** Two steps: text a code to the phone, then the code + new password. */
export function useChangePassword(onDone: () => void) {
  const [challenge, setChallenge] = useState<PasswordChallenge | null>(null)
  const form = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema), defaultValues: { code: '', next: '' } })
  const send = useMutation({ mutationFn: startPasswordChange, onSuccess: setChallenge, meta: { inlineError: true } })
  const save = useMutation({
    mutationFn: (values: ChangePasswordValues) => completePasswordChange(challenge!.challengeId, values.code, values.next),
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
    send.reset()
    save.reset()
  }

  return {
    form,
    challenge,
    sendCode: () => send.mutate(),
    onSubmit: form.handleSubmit((values) => save.mutate(values)),
    reset,
    isPending: send.isPending || save.isPending,
    error: (save.error ?? send.error)?.message,
  }
}
