import type { UseFormReturn } from 'react-hook-form'

import { PlaceSelects } from '@/components/shared'
import { usePlaceFieldBinding } from '@/hooks/use-place-field-binding'
import type { EventForm } from '../utils/event-schema'

/** State, LGA and ward selects bound to the event form. */
export function EventPlaceFields({ form }: { form: UseFormReturn<EventForm> }) {
  const place = usePlaceFieldBinding(form)
  return <PlaceSelects compact idPrefix="event" value={place.value} onChange={place.onChange} errors={place.errors} />
}
