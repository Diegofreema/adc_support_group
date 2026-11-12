import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'

import { homePathFor } from '../services/auth.service'
import { setPassword } from '../services/password.service'
import { passwordRules } from '../utils/password-rules'
import { setPasswordSchema, type SetPasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/** New password with the code from "Forgot password"; signs in on success. */
export function useSetPassword() {
  const navigate = useNavigate()
  const { phone, challenge } = useSearch({ from: '/set-password' })
  const form = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { code: '', password: '', repeat: '', show: false },
  })
  const mutation = useMutation({
    mutationFn: (values: SetPasswordValues) =>
      setPassword({ phone: phone ?? '', challengeId: challenge ?? '', code: values.code, password: values.password }),
    onSuccess: (user) => {
      notify('Password saved')
      navigate({ to: homePathFor(user) })
    },
  })
  const [password, show] = useWatch({ control: form.control, name: ['password', 'show'] })
  return {
    form,
    phone,
    hasCode: Boolean(phone && challenge),
    rules: passwordRules(password),
    showPassword: show,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
    isPending: mutation.isPending,
  }
}
