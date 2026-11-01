import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'

import { homePathFor, login } from '../services/auth.service'
import type { LoginMethod } from '../types/auth.types'
import { loginSchema, type LoginValues } from '../utils/schemas'

const DEFAULTS: LoginValues = { method: 'phone', identifier: '', password: '' }

/** Login form state, validation and submit. */
export function useLogin() {
  const navigate = useNavigate()
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: DEFAULTS })
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => navigate({ to: homePathFor(user) }),
  })

  const method = useWatch({ control: form.control, name: 'method' })
  const setMethod = (next: LoginMethod) => {
    form.setValue('method', next)
    form.setValue('identifier', '')
    form.clearErrors('identifier')
  }
  const onSubmit = form.handleSubmit((values) => mutation.mutate({ identifier: values.identifier, password: values.password }))

  return { form, method, setMethod, onSubmit, isPending: mutation.isPending, error: mutation.error?.message }
}
