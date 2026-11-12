import { UserCheck } from 'lucide-react'

import { Button, Field, Stat, TextArea, TextInput } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { useRecordEvent } from '../hooks/use-record-event'
import type { GroupEvent } from '../types'
import { EventPhotoPicker } from './EventPhotoPicker'

type RecordFlow = ReturnType<typeof useRecordEvent>

/** Guests and people reached, side by side. */
function NumberFields({ flow }: { flow: RecordFlow }) {
  const { register, formState: { errors } } = flow.form
  return (
    <div className="grid-2 !grid-cols-2 mt-5">
      <Field label="Guests" htmlFor="record-guests" hint="Not members" error={errors.guests?.message}>
        <TextInput id="record-guests" inputMode="numeric" placeholder="0" {...register('guests', { onChange: (event) => flow.onGuestsChange(event.target.value) })} />
      </Field>
      <Field label="People reached" htmlFor="record-people" hint="Members + guests" error={errors.peopleReached?.message} className="!mt-0">
        <TextInput id="record-people" inputMode="numeric" placeholder="0" {...register('peopleReached')} />
      </Field>
    </div>
  )
}

/** "Make it an activity": the count, numbers, photos, note, send. */
export function RecordEventForm({ event, flow }: { event: GroupEvent; flow: RecordFlow }) {
  const { photos } = flow
  return (
    <form className="main-narrow mx-auto" noValidate onSubmit={(submitEvent) => void flow.submit(submitEvent)}>
      <h1 className="h1">Make it an activity</h1>
      <p className="muted mt-1">{event.title}</p>
      <div className="stats mt-5 !grid-cols-1"><Stat label="Members present" value={formatNumber(event.presentCount)} icon={UserCheck} /></div>
      <NumberFields flow={flow} />
      <Field label="Photos" hint="At least 1" className="mt-5">
        <EventPhotoPicker photos={photos.items} max={photos.max} adding={photos.adding} error={photos.error} onAdd={photos.add} onRemove={photos.remove} />
      </Field>
      <Field label="Note" htmlFor="record-note" optional error={flow.form.formState.errors.note?.message} className="mt-4">
        <TextArea id="record-note" placeholder="How did it go?" {...flow.form.register('note')} />
      </Field>
      <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={flow.isSending || photos.adding}>{flow.isSending ? 'Sending…' : 'Send'}</Button>
    </form>
  )
}
