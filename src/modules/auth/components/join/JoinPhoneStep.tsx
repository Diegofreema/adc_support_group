import type { UseFormReturn } from 'react-hook-form'

import { Field, PhoneInput, WizardActions } from '@/components/shared'
import type { JoinValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'

interface JoinPhoneStepProps {
  form: UseFormReturn<JoinValues>
  onBack: () => void
  onNext: () => void
  loading: boolean
}

export function JoinPhoneStep({ form, onBack, onNext, loading }: JoinPhoneStepProps) {
  return (
    <>
      <StepHeading title="Your phone" />
      <Field label="Phone number" htmlFor="join-phone" error={form.formState.errors.phone?.message} className="mt-5">
        <PhoneInput id="join-phone" {...form.register('phone')} />
      </Field>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="Send code" loading={loading} />
    </>
  )
}
