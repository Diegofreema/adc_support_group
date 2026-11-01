import type { UseFormReturn } from 'react-hook-form'

import { Field, TextInput, WizardActions } from '@/components/shared'
import { usePlaceBinding } from '../../hooks/use-place-binding'
import type { JoinValues } from '../../utils/schemas'
import { PlaceSelects } from '../shared/PlaceSelects'
import { StepHeading } from '../shared/StepHeading'
import { OptionalDetails } from './OptionalDetails'

interface JoinDetailsStepProps {
  form: UseFormReturn<JoinValues>
  onBack: () => void
  onFinish: () => void
  loading: boolean
}

export function JoinDetailsStep({ form, onBack, onFinish, loading }: JoinDetailsStepProps) {
  const place = usePlaceBinding(form)
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="Your details" />
      <Field label="Full name" htmlFor="join-name" error={errors.fullName?.message} className="mt-5">
        <TextInput id="join-name" autoComplete="name" {...form.register('fullName')} />
      </Field>
      <PlaceSelects idPrefix="join" value={place.value} onChange={place.onChange} errors={place.errors} />
      <Field label="Password" htmlFor="join-password" error={errors.password?.message}>
        <TextInput id="join-password" type="password" autoComplete="new-password" placeholder="8+ characters" {...form.register('password')} />
      </Field>
      <OptionalDetails form={form} />
      <WizardActions onBack={onBack} onNext={onFinish} nextLabel="Finish" loading={loading} />
    </>
  )
}
