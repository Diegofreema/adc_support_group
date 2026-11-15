import type { UseFormReturn } from 'react-hook-form'

import { Field, TextInput } from '@/components/shared'
import type { LoginValues } from '../../utils/schemas'

/** One box for a phone number or an email: no switch to pick first. */
export function LoginIdentifierField({ form }: { form: UseFormReturn<LoginValues> }) {
  return (
    <Field label="Phone number or email" htmlFor="login-identifier" error={form.formState.errors.identifier?.message}>
      <TextInput
        id="login-identifier"
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="0803 123 4567"
        {...form.register('identifier')}
      />
    </Field>
  )
}
