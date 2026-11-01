import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

import { cascadePlace, type PlaceValue } from '../utils/places'

type PlaceErrors = Partial<Record<keyof PlaceValue, string>>

const PLACE_FIELDS: (keyof PlaceValue)[] = ['state', 'lga', 'ward']

/** Connects cascading state/LGA/ward selects to any form that has those fields. */
export function usePlaceBinding<Values extends FieldValues & PlaceValue>(form: UseFormReturn<Values>) {
  const value: PlaceValue = { state: form.watch('state' as Path<Values>), lga: form.watch('lga' as Path<Values>), ward: form.watch('ward' as Path<Values>) }

  const onChange = (field: keyof PlaceValue, next: string) => {
    const updated = cascadePlace(value, field, next)
    PLACE_FIELDS.forEach((key) => form.setValue(key as Path<Values>, updated[key] as PathValue<Values, Path<Values>>, { shouldValidate: key === field }))
  }

  const errors: PlaceErrors = {}
  PLACE_FIELDS.forEach((key) => {
    const message = form.formState.errors[key]?.message
    if (typeof message === 'string') errors[key] = message
  })

  return { value, onChange, errors }
}
