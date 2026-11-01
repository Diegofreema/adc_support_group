import { Field, SelectInput } from '@/components/shared'
import { NIGERIAN_STATES, lgasFor, updatePlace, wardsFor, type PlaceDepth, type PlaceValue } from '../utils/places'

interface PlaceSelectsProps {
  value: PlaceValue
  onChange: (value: PlaceValue) => void
  /** How deep to ask: state only, state + LGA, or down to ward. */
  depth?: PlaceDepth
  errors?: Partial<Record<PlaceDepth, string>>
  idPrefix: string
}

const ORDER: PlaceDepth[] = ['state', 'lga', 'ward']

/** State → LGA → Ward selects; choosing a parent clears its children. */
export function PlaceSelects({ value, onChange, depth = 'ward', errors = {}, idPrefix }: PlaceSelectsProps) {
  const shows = (part: PlaceDepth) => ORDER.indexOf(part) <= ORDER.indexOf(depth)
  const select = (part: PlaceDepth) => (event: { target: { value: string } }) => onChange(updatePlace(value, part, event.target.value))
  return (
    <>
      <Field label="State" htmlFor={`${idPrefix}-state`} error={errors.state}>
        <SelectInput id={`${idPrefix}-state`} options={NIGERIAN_STATES} placeholder="Choose" value={value.state} onChange={select('state')} />
      </Field>
      {shows('lga') && (
        <Field label="LGA" htmlFor={`${idPrefix}-lga`} error={errors.lga}>
          <SelectInput id={`${idPrefix}-lga`} options={lgasFor(value.state)} placeholder="Choose" value={value.lga} onChange={select('lga')} disabled={!value.state} />
        </Field>
      )}
      {shows('ward') && (
        <Field label="Ward" htmlFor={`${idPrefix}-ward`} error={errors.ward}>
          <SelectInput id={`${idPrefix}-ward`} options={wardsFor(value.lga)} placeholder="Choose" value={value.ward} onChange={select('ward')} disabled={!value.lga} />
        </Field>
      )}
    </>
  )
}
