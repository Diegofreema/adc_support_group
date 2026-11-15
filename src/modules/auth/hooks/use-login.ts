import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { homePathFor, login } from '../services/auth.service'
import { loginSchema, type LoginValues } from '../utils/schemas'
import { useAppForm } from '@/hooks/use-app-form'
import { friendlyError } from '@/lib/errors'

const DEFAULTS: LoginValues = { identifier: '', password: '' }

/** Login form state, validation and submit. */
export function useLogin() {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/' })
  const form = useAppForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: DEFAULTS })
  const mutation = useMutation({
    mutationFn: login,
    meta: { inlineError: true },
    // redirect is already limited to internal paths by the route's validateSearch.
    onSuccess: (user) => (redirect ? navigate({ href: redirect }) : navigate({ to: homePathFor(user) })),
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate({ identifier: values.identifier, password: values.password }))

  return { form, onSubmit, isPending: mutation.isPending, error: mutation.error ? friendlyError(mutation.error) : undefined }
}
