import type { UseFormReturn } from 'react-hook-form'

import { Field, PasswordInput, PlaceSelects, WizardActions } from '@/components/shared'
import { usePlaceFieldBinding } from '@/hooks/use-place-field-binding'
import type { JoinValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'
import { OptionalDetails } from './OptionalDetails'

interface JoinDetailsStepProps {
  form: UseFormReturn<JoinValues>
  onBack: () => void
  onFinish: () => void
  loading: boolean
}

export function JoinDetailsStep({ form, onBack, onFinish, loading }: JoinDetailsStepProps) {
  const place = usePlaceFieldBinding(form)
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="Where you are" />
      <PlaceSelects compact idPrefix="join" value={place.value} onChange={place.onChange} errors={place.errors} />
      <Field label="Password" htmlFor="join-password" error={errors.password?.message}>
        <PasswordInput id="join-password" autoComplete="new-password" placeholder="8+ characters" {...form.register('password')} />
      </Field>
      <OptionalDetails form={form} />
      <WizardActions onBack={onBack} onNext={onFinish} nextLabel="Finish" loading={loading} />
    </>
  )
}
