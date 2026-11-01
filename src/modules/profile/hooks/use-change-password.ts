import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { changePassword } from '../services/profile.service'
import { changePasswordSchema, type ChangePasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

export function useChangePassword(onDone: () => void) {
  const form = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema), defaultValues: { current: '', next: '' } })
  const mutation = useMutation({
    mutationFn: (values: ChangePasswordValues) => changePassword(values.current),
    onSuccess: () => {
      notify('Password changed')
      form.reset()
      onDone()
    },
  })
  return { form, onSubmit: form.handleSubmit((values) => mutation.mutate(values)), isPending: mutation.isPending, error: mutation.error?.message }
}
