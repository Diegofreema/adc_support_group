import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { finishEmailCheck, startEmailCheck, type EmailCheck } from '../services/profile.service'
import { emailCodeSchema, emailSchema } from '../utils/schemas'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'
import { profileQuery } from './use-profile'

/** Add or change the email: send a code to it, then check the code. */
export function useEmailCheck(onDone: () => void, initialEmail = '') {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  const [check, setCheck] = useState<EmailCheck | null>(null)
  const emailForm = useForm<{ email: string }>({ resolver: zodResolver(emailSchema), defaultValues: { email: initialEmail } })
  const codeForm = useForm<{ code: string }>({ resolver: zodResolver(emailCodeSchema), defaultValues: { code: '' } })

  const send = useMutation({
    mutationFn: (email: string) => startEmailCheck(email),
    onSuccess: setCheck,
    meta: { inlineError: true },
  })
  const confirm = useMutation({
    mutationFn: (code: string) => finishEmailCheck(check!.challengeId, code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileQuery(user.id).queryKey })
      notify('Email confirmed. You can sign in with it too.')
      reset()
      onDone()
    },
    meta: { inlineError: true },
  })

  function reset() {
    emailForm.reset()
    codeForm.reset()
    setCheck(null)
    send.reset()
    confirm.reset()
  }

  return {
    check,
    emailForm,
    codeForm,
    sendCode: emailForm.handleSubmit(({ email }) => send.mutate(email)),
    resend: () => send.mutate(emailForm.getValues('email')),
    confirmCode: codeForm.handleSubmit(({ code }) => confirm.mutate(code)),
    back: () => { setCheck(null); codeForm.reset(); confirm.reset() },
    reset,
    isPending: send.isPending || confirm.isPending,
    error: (send.error ?? confirm.error)?.message,
  }
}
