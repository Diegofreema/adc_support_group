import type { UseFormReturn } from 'react-hook-form'

import { Field, PlaceSelects } from '@/components/shared'
import { usePlaceFieldBinding } from '@/hooks/use-place-field-binding'
import type { RegisterGroupValues } from '../../utils/schemas'
import { LevelChoices } from './LevelChoices'

const DEPTH = { state: 'state', lga: 'lga', ward: 'ward' } as const

/** Level, then only the location fields that level needs. */
export function NigeriaFields({ form }: { form: UseFormReturn<RegisterGroupValues> }) {
  const place = usePlaceFieldBinding(form)
  const level = form.watch('level')
  return (
    <>
      <Field label="Level" className="mt-5">
        <LevelChoices value={level} onChange={(next) => form.setValue('level', next)} />
      </Field>
      {level !== 'national' && <PlaceSelects compact idPrefix="reg" depth={DEPTH[level]} value={place.value} onChange={place.onChange} errors={place.errors} />}
    </>
  )
}
