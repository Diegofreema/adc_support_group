import type { UseFormReturn } from 'react-hook-form'

import { Button, Field, PasswordInput, PhoneInput, TextInput, WizardActions } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'
import { HaveAccount } from '../shared/HaveAccount'
import { StepHeading } from '../shared/StepHeading'

interface RegisterAccountStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onSendCode: () => void
  sendingCode?: boolean
  onNext: () => void
}

export function RegisterAccountStep({ form, onSendCode, sendingCode, onNext }: RegisterAccountStepProps) {
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="Your account" helper="You'll use this to log in." />
      <Field label="Full name" htmlFor="reg-name" error={errors.fullName?.message} className="mt-5">
        <TextInput id="reg-name" autoComplete="name" {...form.register('fullName')} />
      </Field>
      <Field label="Phone number" htmlFor="reg-phone" error={errors.phone?.message}>
        <PhoneInput id="reg-phone" {...form.register('phone')} />
      </Field>
      <Field label="Code from SMS" htmlFor="reg-code" hint="Tap Send code, then type the 6 numbers we text you." error={errors.code?.message}>
        <div className="row">
          <TextInput id="reg-code" className="grow num" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="6 numbers" {...form.register('code')} />
          <Button onClick={onSendCode} loading={sendingCode}>Send code</Button>
        </div>
      </Field>
      <Field label="Make a password" htmlFor="reg-password" hint="At least 8 characters, with a number." error={errors.password?.message}>
        <PasswordInput id="reg-password" autoComplete="new-password" {...form.register('password')} />
      </Field>
      <WizardActions onNext={onNext} />
      <HaveAccount />
    </>
  )
}
