import type { ChangeEvent } from 'react'

import { Field } from './Field'
import { SelectInput } from './SelectInput'
import { usePlaceOptions } from '@/hooks/use-place-options'
import { placePartShown, updatePlace, type PlacePart, type PlaceValue } from '@/lib/geo/places'
import { cn } from '@/lib/utils'

interface PlaceSelectsProps {
  value: PlaceValue
  onChange: (value: PlaceValue) => void
  /** How deep to ask: state only, state + LGA, or down to ward. */
  depth?: PlacePart
  errors?: Partial<Record<PlacePart, string>>
  idPrefix: string
  /** LGA and ward side by side (saves space in long forms). */
  compact?: boolean
}

/** State → LGA → ward selects; choosing a parent clears its children. */
export function PlaceSelects({ value, onChange, depth = 'ward', errors = {}, idPrefix, compact }: PlaceSelectsProps) {
  const options = usePlaceOptions(value.state, value.lga)
  const select = (part: PlacePart) => (event: ChangeEvent<HTMLSelectElement>) => onChange(updatePlace(value, part, event.target.value))
  const id = (part: PlacePart) => `${idPrefix}-${part}`

  const lga = placePartShown('lga', depth) && (
    <Field label="LGA" htmlFor={id('lga')} error={errors.lga}>
      <SelectInput id={id('lga')} options={options.lgas} placeholder="Choose" value={value.lga} onChange={select('lga')} disabled={!value.state} />
    </Field>
  )
  const ward = placePartShown('ward', depth) && (
    <Field label="Ward" htmlFor={id('ward')} error={errors.ward} className={cn(compact && '!mt-0')}>
      <SelectInput id={id('ward')} options={options.wards} placeholder="Choose" value={value.ward} onChange={select('ward')} disabled={!value.lga} />
    </Field>
  )

  return (
    <>
      <Field label="State" htmlFor={id('state')} error={errors.state}>
        <SelectInput id={id('state')} options={options.states} placeholder="Choose" value={value.state} onChange={select('state')} />
      </Field>
      {compact && lga ? <div className="grid-2 mt-4 !grid-cols-2">{lga}{ward}</div> : <>{lga}{ward}</>}
    </>
  )
}
