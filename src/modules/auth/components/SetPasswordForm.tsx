import { KeyRound } from 'lucide-react'

import { Button, Field, IconTile, PasswordInput, TextInput } from '@/components/shared'
import { formatPhone } from '@/lib/phone'
import { useSetPassword } from '../hooks/use-set-password'
import { RequestCodeForm } from './RequestCodeForm'
import { PasswordRules } from './shared/PasswordRules'
import { StepHeading } from './shared/StepHeading'

export function SetPasswordForm() {
  const { form, phone, via, welcome, hasCode, onCodeSent, rules, onSubmit, isPending } = useSetPassword()
  const errors = form.formState.errors

  if (!hasCode) {
    return (
      <>
        <IconTile icon={KeyRound} className="mb-4" />
        <StepHeading
          title={welcome ? 'Welcome to ADC Support Group' : 'Set a new password'}
          helper={welcome ? 'Get a code to set your password. Use the phone number your group added you with.' : 'Get a code to set a new password.'}
        />
        <div className="mt-6"><RequestCodeForm initialPhone={phone ?? ''} onSent={onCodeSent} /></div>
      </>
    )
  }

  const sentTo = via === 'email' ? 'your email' : formatPhone(phone ?? '')
  return (
    <form onSubmit={onSubmit} noValidate>
      <IconTile icon={KeyRound} className="mb-4" />
      <StepHeading title={welcome ? 'Set your password' : 'New password'} helper={`Enter the code we sent to ${sentTo}.`} />
      <Field label="Code" htmlFor="reset-code" error={errors.code?.message} className="mt-6">
        <TextInput id="reset-code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="6 digits" {...form.register('code')} />
      </Field>
      <Field label="New password" htmlFor="new-password" error={errors.password?.message}>
        <PasswordInput id="new-password" autoComplete="new-password" {...form.register('password')} />
        <PasswordRules rules={rules} />
      </Field>
      <Field label="Repeat password" htmlFor="repeat-password" error={errors.repeat?.message}>
        <PasswordInput id="repeat-password" autoComplete="new-password" {...form.register('repeat')} />
      </Field>
      <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={isPending}>Save and sign in</Button>
    </form>
  )
}
