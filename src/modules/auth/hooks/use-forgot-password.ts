import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { requestPasswordReset } from '../services/verification.service'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/** "Forgot password" dialog: send a reset code, then close. */
export function useForgotPassword(onDone: () => void) {
  const form = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { identifier: '' } })
  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordValues) => requestPasswordReset(values.identifier),
    onSuccess: () => {
      notify('Code sent')
      form.reset()
      onDone()
    },
  })
  return { form, onSubmit: form.handleSubmit((values) => mutation.mutate(values)), isPending: mutation.isPending }
}
