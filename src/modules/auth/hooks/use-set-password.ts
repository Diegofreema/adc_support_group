import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'

import { setPassword } from '../services/password.service'
import { passwordRules } from '../utils/password-rules'
import { setPasswordSchema, type SetPasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/** Temporary password sent by SMS/email in the import flow (mock). */
const TEMPORARY_PASSWORD = 'Adc-482913'

export function useSetPassword() {
  const navigate = useNavigate()
  const form = useForm<SetPasswordValues>({ resolver: zodResolver(setPasswordSchema), defaultValues: { password: '', repeat: '', show: false } })
  const mutation = useMutation({
    mutationFn: (values: SetPasswordValues) => setPassword(values.password),
    onSuccess: () => {
      notify('Password saved')
      navigate({ to: '/home' })
    },
  })
  const [password, show] = useWatch({ control: form.control, name: ['password', 'show'] })
  const rules = passwordRules(password, TEMPORARY_PASSWORD)
  return { form, rules, showPassword: show, onSubmit: form.handleSubmit((values) => mutation.mutate(values)), isPending: mutation.isPending }
}
