import type { UseFormReturn } from 'react-hook-form'

import { Field, TextInput, WizardActions } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'
import { LeaderPhotoPicker } from './LeaderPhotoPicker'

interface RegisterLeaderStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onBack: () => void
  onNext: () => void
}

export function RegisterLeaderStep({ form, onBack, onNext }: RegisterLeaderStepProps) {
  return (
    <>
      <StepHeading title="Leader" />
      <LeaderPhotoPicker fileName={form.watch('photoName')} onPick={(file) => form.setValue('photoName', file.name)} />
      <Field label="Your title" htmlFor="reg-title" error={form.formState.errors.leaderTitle?.message} className="mt-5">
        <TextInput id="reg-title" placeholder="National Coordinator" {...form.register('leaderTitle')} />
      </Field>
      <Field label="CAC number" htmlFor="reg-cac" optional>
        <TextInput id="reg-cac" placeholder="RC / IT number" {...form.register('cacNumber')} />
      </Field>
      <WizardActions onBack={onBack} onNext={onNext} />
    </>
  )
}
