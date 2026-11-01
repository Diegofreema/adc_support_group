import { Field, SelectInput } from '@/components/shared'
import { useLocationOptions } from '../../hooks/use-location-options'
import type { PlaceValue } from '../../utils/places'

interface PlaceSelectsProps {
  value: PlaceValue
  onChange: (field: keyof PlaceValue, value: string) => void
  errors?: Partial<Record<keyof PlaceValue, string>>
  /** How deep to ask: state only, state + LGA, or all three. */
  depth?: 'state' | 'lga' | 'ward'
  idPrefix?: string
}

/** State → LGA → ward selects. */
export function PlaceSelects({ value, onChange, errors = {}, depth = 'ward', idPrefix = 'place' }: PlaceSelectsProps) {
  const options = useLocationOptions(value.state, value.lga)
  return (
    <>
      <Field label="State" htmlFor={`${idPrefix}-state`} error={errors.state}>
        <SelectInput id={`${idPrefix}-state`} options={options.states} placeholder="Choose" value={value.state} onChange={(event) => onChange('state', event.target.value)} />
      </Field>
      {depth !== 'state' && (
        <div className="grid-2 mt-4 !grid-cols-2">
          <Field label="LGA" htmlFor={`${idPrefix}-lga`} error={errors.lga}>
            <SelectInput id={`${idPrefix}-lga`} options={options.lgas} placeholder="Choose" value={value.lga} disabled={!value.state} onChange={(event) => onChange('lga', event.target.value)} />
          </Field>
          {depth === 'ward' && (
            <Field label="Ward" htmlFor={`${idPrefix}-ward`} error={errors.ward} className="!mt-0">
              <SelectInput id={`${idPrefix}-ward`} options={options.wards} placeholder="Choose" value={value.ward} disabled={!value.lga} onChange={(event) => onChange('ward', event.target.value)} />
            </Field>
          )}
        </div>
      )}
    </>
  )
}
