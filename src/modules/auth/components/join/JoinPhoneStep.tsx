import { Link } from '@tanstack/react-router'
import type { UseFormReturn } from 'react-hook-form'

import { Banner, Field, PhoneInput, TextInput, WizardActions } from '@/components/shared'
import type { JoinValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'

interface JoinPhoneStepProps {
  form: UseFormReturn<JoinValues>
  onBack: () => void
  onNext: () => void
  loading: boolean
  /** Why the code couldn't be sent. */
  error?: string
  /** The phone already has an account: log in, then come back to this link. */
  loginToJoin?: string
}

/** Name and phone first: the sign-up code SMS is sent in the person's name. */
export function JoinPhoneStep({ form, onBack, onNext, loading, error, loginToJoin }: JoinPhoneStepProps) {
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="About you" helper="We'll text you a code." />
      <Field label="Full name" htmlFor="join-name" error={errors.fullName?.message} className="mt-5">
        <TextInput id="join-name" autoComplete="name" {...form.register('fullName')} />
      </Field>
      <Field label="Phone number" htmlFor="join-phone" error={errors.phone?.message}>
        <PhoneInput id="join-phone" {...form.register('phone')} />
      </Field>
      {loginToJoin ? (
        <Banner tone="info" title="You already have an account" className="mt-4">
          <Link to="/" search={{ redirect: loginToJoin }} className="bold">Log in to join</Link>
        </Banner>
      ) : error && <Banner tone="danger" className="mt-4">{error}</Banner>}
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="Send code" loading={loading} />
    </>
  )
}
