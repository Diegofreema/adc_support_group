import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextArea, TextInput } from '@/components/shared'
import type { ChapterOption } from '../types'
import type { ActivityDetailsForm } from '../utils/activity-schema'
import { LocationFields } from './LocationFields'

interface DetailsStepProps {
  form: UseFormReturn<ActivityDetailsForm>
  chapters: ChapterOption[]
  /** Label for "no chapter picked" (the backend files it under the recorder's own chapter). */
  defaultChapterLabel: string
}

export function DetailsStep({ form, chapters, defaultChapterLabel }: DetailsStepProps) {
  const { register, formState: { errors } } = form
  return (
    <>
      <h1 className="h1">Details</h1>
      <Field label="Title" htmlFor="act-title" error={errors.title?.message} className="mt-5">
        <TextInput id="act-title" placeholder="e.g. Rally at Kofar Mata" {...register('title')} />
      </Field>
      <div className="grid-2 !grid-cols-2 mt-4">
        <Field label="Date" htmlFor="act-date" error={errors.date?.message}>
          <TextInput id="act-date" type="date" {...register('date')} />
        </Field>
        <Field label="People" htmlFor="act-people" error={errors.peopleReached?.message} className="!mt-0">
          <TextInput id="act-people" inputMode="numeric" placeholder="0" {...register('peopleReached')} />
        </Field>
      </div>
      <div className="mt-4"><LocationFields form={form} /></div>
      {chapters.length > 0 && (
        <Field label="Chapter" htmlFor="act-chapter" optional className="mt-4">
          <SelectInput id="act-chapter" placeholder={defaultChapterLabel} options={chapters} {...register('chapterId')} />
        </Field>
      )}
      <Field label="Note" htmlFor="act-note" optional className="mt-4">
        <TextArea id="act-note" placeholder="Anything to add" {...register('note')} />
      </Field>
    </>
  )
}
