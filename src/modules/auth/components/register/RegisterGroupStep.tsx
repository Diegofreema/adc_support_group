import { Controller, type UseFormReturn } from 'react-hook-form'

import { ChoiceTiles, Field, TextArea, TextInput, WizardActions } from '@/components/shared'
import { GROUP_CATEGORIES } from '@/config/group-categories'
import type { RegisterGroupValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'

interface RegisterGroupStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onBack: () => void
  onNext: () => void
}

export function RegisterGroupStep({ form, onBack, onNext }: RegisterGroupStepProps) {
  const errors = form.formState.errors
  return (
    <>
      <StepHeading title="Your group" />
      <Field label="Group name" htmlFor="reg-group" error={errors.groupName?.message} className="mt-5">
        <TextInput id="reg-group" {...form.register('groupName')} />
      </Field>
      <Field label="Category" error={errors.category?.message}>
        <Controller control={form.control} name="category" render={({ field }) => (
          <ChoiceTiles name="category" label="Category" options={GROUP_CATEGORIES} value={field.value} onChange={field.onChange} />
        )} />
      </Field>
      <Field label="About" htmlFor="reg-about" optional>
        <TextArea id="reg-about" className="!min-h-[88px]" {...form.register('about')} />
      </Field>
      <WizardActions onBack={onBack} onNext={onNext} />
    </>
  )
}
