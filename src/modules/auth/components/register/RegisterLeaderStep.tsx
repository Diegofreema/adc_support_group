import type { UseFormReturn } from 'react-hook-form'

import { Field, TextInput, WizardActions, SinglePhotoField } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'

interface RegisterLeaderStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onBack?: () => void
  onNext: () => void
  onPickPhoto: (file: File) => void
  /** The photo just picked. */
  photo: File | null
  /** Editing: the photo already on the group. */
  existingPhotoUrl?: string
}

export function RegisterLeaderStep({ form, onBack, onNext, onPickPhoto, photo, existingPhotoUrl }: RegisterLeaderStepProps) {
  return (
    <>
      <StepHeading title="Leader" />
      <SinglePhotoField file={photo} onPick={onPickPhoto} currentUrl={existingPhotoUrl} />
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
