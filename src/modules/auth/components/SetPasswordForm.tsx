import { KeyRound } from 'lucide-react'

import { Button, Checkbox, Field, IconTile, TextInput } from '@/components/shared'
import { useSetPassword } from '../hooks/use-set-password'
import { PasswordRules } from './shared/PasswordRules'
import { StepHeading } from './shared/StepHeading'

export function SetPasswordForm() {
  const { form, rules, showPassword, onSubmit, isPending } = useSetPassword()
  const type = showPassword ? 'text' : 'password'
  return (
    <form onSubmit={onSubmit} noValidate>
      <IconTile icon={KeyRound} className="mb-4" />
      <StepHeading title="New password" helper="Replace the one we sent you." />
      <Field label="New password" htmlFor="new-password" error={form.formState.errors.password?.message} className="mt-6">
        <TextInput id="new-password" type={type} autoComplete="new-password" {...form.register('password')} />
        <PasswordRules rules={rules} />
      </Field>
      <Field label="Repeat password" htmlFor="repeat-password" error={form.formState.errors.repeat?.message}>
        <TextInput id="repeat-password" type={type} autoComplete="new-password" {...form.register('repeat')} />
      </Field>
      <div className="mt-4"><Checkbox {...form.register('show')}><span className="small">Show password</span></Checkbox></div>
      <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={isPending}>Save</Button>
    </form>
  )
}
