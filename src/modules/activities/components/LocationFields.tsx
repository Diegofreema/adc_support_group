import type { UseFormReturn } from 'react-hook-form'

import { PlaceSelects } from '@/components/shared'
import { usePlaceFieldBinding } from '@/hooks/use-place-field-binding'
import type { ActivityDetailsForm } from '../utils/activity-schema'

/** State, LGA and ward selects bound to the details form. */
export function LocationFields({ form }: { form: UseFormReturn<ActivityDetailsForm> }) {
  const place = usePlaceFieldBinding(form)
  return <PlaceSelects compact idPrefix="act" value={place.value} onChange={place.onChange} errors={place.errors} />
}
