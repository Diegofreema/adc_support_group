import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput } from '@/components/shared'
import type { EventForm } from '../utils/event-schema'
import type { ChapterOption } from '../types'

interface EventChapterFieldProps {
  form: UseFormReturn<EventForm>
  chapters: ChapterOption[]
  coordinator: boolean
  /** Shown when editing: the chapter can't change. */
  fixedLabel?: string
}

/** Who it's for: a chapter or the whole group. Coordinators and edits see it fixed. */
export function EventChapterField({ form, chapters, coordinator, fixedLabel }: EventChapterFieldProps) {
  if (fixedLabel) return <p className="muted mt-4">For: {fixedLabel}</p>
  if (coordinator) return <p className="muted mt-4">For: your chapter</p>
  if (chapters.length === 0) return null
  return (
    <Field label="Who is it for?" htmlFor="event-chapter" className="mt-4">
      <SelectInput id="event-chapter" placeholder="Whole group" options={chapters} {...form.register('chapterId')} />
    </Field>
  )
}
