import type { UseFormReturn } from 'react-hook-form'

import { ActionBar } from '@/components/layout/ActionBar'
import { Button, Field, PhoneInput, TextInput } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'
import { HaveAccount } from '../shared/HaveAccount'
import { StepHeading } from '../shared/StepHeading'

interface RegisterAccountStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onSendCode: () => void
  onNext: () => void
}

export function RegisterAccountStep({ form, onSendCode, onNext }: RegisterAccountStepProps) {
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="Your account" />
      <Field label="Full name" htmlFor="reg-name" error={errors.fullName?.message} className="mt-5">
        <TextInput id="reg-name" autoComplete="name" {...form.register('fullName')} />
      </Field>
      <Field label="Phone number" htmlFor="reg-phone" error={errors.phone?.message}>
        <PhoneInput id="reg-phone" {...form.register('phone')} />
      </Field>
      <Field label="Code" htmlFor="reg-code" error={errors.code?.message}>
        <div className="row">
          <TextInput id="reg-code" className="grow" inputMode="numeric" maxLength={6} placeholder="6 digits" {...form.register('code')} />
          <Button onClick={onSendCode}>Send</Button>
        </div>
      </Field>
      <Field label="Password" htmlFor="reg-password" error={errors.password?.message}>
        <TextInput id="reg-password" type="password" autoComplete="new-password" placeholder="8+ characters" {...form.register('password')} />
      </Field>
      <ActionBar><Button variant="primary" size="lg" block onClick={onNext}>Next</Button></ActionBar>
      <HaveAccount />
    </>
  )
}
