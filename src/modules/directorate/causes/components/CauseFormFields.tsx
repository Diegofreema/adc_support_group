import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextInput, type SelectOption } from '@/components/shared'
import type { CauseFormValues } from '../types'

/** The inputs of the cause form, bound to react-hook-form. */
export function CauseFormFields({ form, visibleToOptions }: { form: UseFormReturn<CauseFormValues>; visibleToOptions: SelectOption[] }) {
  const { register, formState: { errors } } = form
  return (
    <>
      <Field label="Name" htmlFor="cause-title" error={errors.title?.message}><TextInput id="cause-title" {...register('title')} /></Field>
      <Field label="Short note" htmlFor="cause-desc" optional error={errors.description?.message}><TextInput id="cause-desc" {...register('description')} /></Field>
      <div className="grid-2 mt-4">
        <Field label="Target (₦)" htmlFor="cause-target" error={errors.target?.message}><TextInput id="cause-target" inputMode="numeric" {...register('target')} /></Field>
        <Field label="Last day" htmlFor="cause-deadline" error={errors.deadline?.message} className="!mt-0"><TextInput id="cause-deadline" type="date" {...register('deadline')} /></Field>
      </div>
      <Field label="Who sees it" htmlFor="cause-visible" className="mt-4"><SelectInput id="cause-visible" options={visibleToOptions} {...register('visibleTo')} /></Field>
    </>
  )
}
