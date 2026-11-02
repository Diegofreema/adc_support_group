import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

import { PLACE_PARTS, type PlacePart, type PlaceValue } from '@/lib/geo/places'

export type PlaceErrors = Partial<Record<PlacePart, string>>

export interface PlaceFieldBinding {
  value: PlaceValue
  onChange: (next: PlaceValue) => void
  errors: PlaceErrors
}

function readPlaceErrors<Values extends FieldValues>(form: UseFormReturn<Values>): PlaceErrors {
  const errors: PlaceErrors = {}
  PLACE_PARTS.forEach((part) => {
    const message = form.formState.errors[part]?.message
    if (typeof message === 'string') errors[part] = message
  })
  return errors
}

function changedPart(previous: PlaceValue, next: PlaceValue): PlacePart | undefined {
  return PLACE_PARTS.find((part) => previous[part] !== next[part])
}

/** Connects PlaceSelects to a react-hook-form form that has state/lga/ward fields. */
export function usePlaceFieldBinding<Values extends FieldValues & PlaceValue>(form: UseFormReturn<Values>): PlaceFieldBinding {
  const field = (part: PlacePart) => part as Path<Values>
  const value: PlaceValue = { state: form.watch(field('state')), lga: form.watch(field('lga')), ward: form.watch(field('ward')) }

  const onChange = (next: PlaceValue) => {
    const changed = changedPart(value, next)
    PLACE_PARTS.forEach((part) => form.setValue(field(part), next[part] as PathValue<Values, Path<Values>>, { shouldValidate: part === changed }))
  }

  return { value, onChange, errors: readPlaceErrors(form) }
}
