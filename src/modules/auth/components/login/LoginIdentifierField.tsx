import type { UseFormReturn } from 'react-hook-form'

import { Field, PhoneInput, TextInput } from '@/components/shared'
import type { LoginMethod } from '../../types/auth.types'
import type { LoginValues } from '../../utils/schemas'

interface LoginIdentifierFieldProps {
  form: UseFormReturn<LoginValues>
  method: LoginMethod
}

/** Phone or email input, depending on the chosen method. */
export function LoginIdentifierField({ form, method }: LoginIdentifierFieldProps) {
  const error = form.formState.errors.identifier?.message
  if (method === 'phone') {
    return (
      <Field label="Phone number" htmlFor="login-phone" error={error}>
        <PhoneInput id="login-phone" {...form.register('identifier')} />
      </Field>
    )
  }
  return (
    <Field label="Email" htmlFor="login-email" error={error}>
      <TextInput id="login-email" type="email" autoComplete="email" placeholder="you@email.com" {...form.register('identifier')} />
    </Field>
  )
}
