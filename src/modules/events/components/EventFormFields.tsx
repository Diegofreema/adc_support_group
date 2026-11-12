import { Field, TextArea, TextInput } from '@/components/shared'
import type { EventFormFlow } from '../hooks/use-event-form'
import { EventPlaceFields } from './EventPlaceFields'
import { EventTypeField } from './EventTypeField'

/** Type, title, date and times. */
function WhatAndWhen({ flow }: { flow: EventFormFlow }) {
  const { register, formState: { errors } } = flow.form
  return (
    <>
      <EventTypeField form={flow.form} options={flow.types} />
      <Field label="Title" htmlFor="event-title" error={errors.title?.message} className="mt-5">
        <TextInput id="event-title" placeholder="e.g. Ward meeting" {...register('title')} />
      </Field>
      <Field label="Date" htmlFor="event-date" error={errors.date?.message} className="mt-4">
        <TextInput id="event-date" type="date" {...register('date')} />
      </Field>
      <div className="grid-2 !grid-cols-2 mt-4">
        <Field label="Starts" htmlFor="event-start" error={errors.startTime?.message}>
          <TextInput id="event-start" type="time" {...register('startTime')} />
        </Field>
        <Field label="Ends" htmlFor="event-end" optional error={errors.endTime?.message} className="!mt-0">
          <TextInput id="event-end" type="time" {...register('endTime')} />
        </Field>
      </div>
    </>
  )
}

/** Venue name and its state, LGA and ward. */
function Where({ flow }: { flow: EventFormFlow }) {
  const { register, formState: { errors } } = flow.form
  return (
    <>
      <Field label="Venue" htmlFor="event-venue" error={errors.venue?.message} className="mt-4">
        <TextInput id="event-venue" placeholder="e.g. Town hall, Kofar Mata" {...register('venue')} />
      </Field>
      <div className="mt-4"><EventPlaceFields form={flow.form} /></div>
    </>
  )
}

export function EventFormFields({ flow }: { flow: EventFormFlow }) {
  return (
    <>
      <WhatAndWhen flow={flow} />
      <Where flow={flow} />
    </>
  )
}

export function EventNoteField({ flow }: { flow: EventFormFlow }) {
  return (
    <Field label="Note" htmlFor="event-note" optional error={flow.form.formState.errors.note?.message} className="mt-4">
      <TextArea id="event-note" placeholder="What to bring, who to ask for" {...flow.form.register('note')} />
    </Field>
  )
}
