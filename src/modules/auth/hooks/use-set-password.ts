import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'

import { homePathFor } from '../services/auth.service'
import { setPassword } from '../services/password.service'
import type { CodeSent } from './use-request-reset-code'
import { passwordRules } from '../utils/password-rules'
import { setPasswordSchema, type SetPasswordValues } from '../utils/schemas'
import { notify } from '@/lib/toast'

/**
 * New password with a code; signs in on success. The code comes from
 * "Forgot password", or is requested on this page (welcome link for
 * imported members, or no code yet).
 */
export function useSetPassword() {
  const navigate = useNavigate()
  const { phone, challenge, via, welcome } = useSearch({ from: '/set-password' })
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
    via,
    welcome: Boolean(welcome),
    hasCode: Boolean(phone && challenge),
    /** A code was requested on this page: keep the welcome flag, add the challenge. */
    onCodeSent: (sent: CodeSent) =>
      navigate({ to: '/set-password', search: { phone: sent.phone, challenge: sent.challengeId, via: sent.channel, welcome }, replace: true }),
    rules: passwordRules(password),
    showPassword: show,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
    isPending: mutation.isPending,
  }
}
