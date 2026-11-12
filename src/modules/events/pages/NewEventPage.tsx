import { EventFormView } from '../components/EventFormView'
import { useEventForm } from '../hooks/use-event-form'

export function NewEventPage() {
  const flow = useEventForm()
  return <EventFormView flow={flow} heading="New event" submitLabel="Add event" />
}
