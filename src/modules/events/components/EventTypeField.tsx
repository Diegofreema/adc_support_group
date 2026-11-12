import { Controller, type UseFormReturn } from 'react-hook-form'

import { ChoiceTiles, Field } from '@/components/shared'
import type { EventForm } from '../utils/event-schema'
import type { EventTypeOption } from '../types'

export function EventTypeField({ form, options }: { form: UseFormReturn<EventForm>; options: EventTypeOption[] }) {
  return (
    <Field label="What kind?" error={form.formState.errors.type?.message}>
      <Controller
        control={form.control}
        name="type"
        render={({ field }) => <ChoiceTiles name="event-type" label="Event type" options={options} value={field.value} onChange={field.onChange} />}
      />
    </Field>
  )
}
