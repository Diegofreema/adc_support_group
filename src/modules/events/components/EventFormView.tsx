import { Banner, Button } from '@/components/shared'
import type { EventFormFlow } from '../hooks/use-event-form'
import { EventChapterField } from './EventChapterField'
import { EventFormFields, EventNoteField } from './EventFormFields'
import { VenueLocationButton } from './VenueLocationButton'

interface EventFormViewProps {
  flow: EventFormFlow
  heading: string
  submitLabel: string
  /** Editing: who it's for, shown fixed. */
  fixedChapterLabel?: string
}

/** The whole new / edit event form, one screen. */
export function EventFormView({ flow, heading, submitLabel, fixedChapterLabel }: EventFormViewProps) {
  return (
    <form className="main-narrow mx-auto" noValidate onSubmit={(event) => void flow.submit(event)}>
      <h1 className="h1">{heading}</h1>
      <div className="mt-5"><EventFormFields flow={flow} /></div>
      <VenueLocationButton status={flow.location.status} onCapture={flow.location.capture} />
      <EventChapterField form={flow.form} chapters={flow.chapters} coordinator={flow.coordinator} fixedLabel={fixedChapterLabel} />
      <EventNoteField flow={flow} />
      {flow.saveError && <Banner tone="danger" className="mt-5">{flow.saveError}</Banner>}
      <Button type="submit" variant="primary" size="lg" block className="mt-6" disabled={flow.isSaving}>{flow.isSaving ? 'Saving…' : submitLabel}</Button>
    </form>
  )
}
