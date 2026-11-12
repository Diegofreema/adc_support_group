import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { requestPasswordReset } from '../services/verification.service'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/** "Forgot password" dialog: send a reset code, then go and set a new password. */
export function useForgotPassword(onDone: () => void) {
  const navigate = useNavigate()
  const form = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { identifier: '' } })
  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordValues) => requestPasswordReset(values.identifier),
    onSuccess: (challenge, values) => {
      notify(`Code sent to ${challenge.sentTo}`)
      form.reset()
      onDone()
      navigate({ to: '/set-password', search: { phone: values.identifier.trim(), challenge: challenge.challengeId } })
    },
  })
  return { form, onSubmit: form.handleSubmit((values) => mutation.mutate(values)), isPending: mutation.isPending }
}
