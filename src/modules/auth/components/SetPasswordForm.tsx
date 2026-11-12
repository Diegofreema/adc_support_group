import { Link } from '@tanstack/react-router'
import { KeyRound } from 'lucide-react'

import { Button, buttonClassName, Checkbox, Field, IconTile, TextInput } from '@/components/shared'
import { formatPhone } from '@/lib/phone'
import { useSetPassword } from '../hooks/use-set-password'
import { PasswordRules } from './shared/PasswordRules'
import { StepHeading } from './shared/StepHeading'

export function SetPasswordForm() {
  const { form, phone, hasCode, rules, showPassword, onSubmit, isPending } = useSetPassword()
  const type = showPassword ? 'text' : 'password'
  const errors = form.formState.errors

  if (!hasCode) {
    return (
      <>
        <IconTile icon={KeyRound} className="mb-4" />
        <StepHeading title="New password" helper="Ask for a code first: tap “Forgot password” on the login page." />
        <Link to="/" className={`${buttonClassName('primary', 'lg', true)} mt-6`}>Go to login</Link>
      </>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <IconTile icon={KeyRound} className="mb-4" />
      <StepHeading title="New password" helper={`Enter the code we sent to ${formatPhone(phone ?? '')}.`} />
      <Field label="Code" htmlFor="reset-code" error={errors.code?.message} className="mt-6">
        <TextInput id="reset-code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="6 digits" {...form.register('code')} />
      </Field>
      <Field label="New password" htmlFor="new-password" error={errors.password?.message}>
        <TextInput id="new-password" type={type} autoComplete="new-password" {...form.register('password')} />
        <PasswordRules rules={rules} />
      </Field>
      <Field label="Repeat password" htmlFor="repeat-password" error={errors.repeat?.message}>
        <TextInput id="repeat-password" type={type} autoComplete="new-password" {...form.register('repeat')} />
      </Field>
      <div className="mt-4"><Checkbox {...form.register('show')}><span className="small">Show password</span></Checkbox></div>
      <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={isPending}>Save and sign in</Button>
    </form>
  )
}
