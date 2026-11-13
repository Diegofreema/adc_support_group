import { useMemo, useState, type ChangeEvent } from 'react'

import { Field, SearchInput, SelectInput } from '@/components/shared'
import { NIGERIAN_STATES } from '@/lib/geo/places'
import { useVotingArea } from '@/lib/geo/voting-area'
import type { VotingAreaChoice } from '../types'

/** Wards with more units than this get a search box above the unit list. */
const SEARCH_FROM_UNITS = 12

interface VotingAreaPickerProps {
  value: VotingAreaChoice
  onChange: (value: VotingAreaChoice) => void
  idPrefix: string
}

/** State → LGA → ward → polling unit, from the INEC list; a parent change clears what's below it. */
export function VotingAreaPicker({ value, onChange, idPrefix }: VotingAreaPickerProps) {
  const { lgas, wards, pollingUnits, loading } = useVotingArea(value.state, value.lga, value.ward)
  const [query, setQuery] = useState('')
  const id = (part: string) => `${idPrefix}-${part}`

  const units = useMemo(() => {
    const words = query.trim().toUpperCase()
    const list = words ? pollingUnits.filter((unit) => unit.name.toUpperCase().includes(words) || unit.code.endsWith(words)) : pollingUnits
    return list.map((unit) => ({ value: unit.code, label: `${unit.name} (${unit.code.slice(-3)})` }))
  }, [pollingUnits, query])

  const pick = (part: keyof VotingAreaChoice) => (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value
    setQuery('')
    if (part === 'state') onChange({ state: next, lga: '', ward: '', code: '' })
    else if (part === 'lga') onChange({ ...value, lga: next, ward: '', code: '' })
    else if (part === 'ward') onChange({ ...value, ward: next, code: '' })
    else onChange({ ...value, code: next })
  }

  return (
    <>
      <Field label="State" htmlFor={id('state')}>
        <SelectInput id={id('state')} options={NIGERIAN_STATES} placeholder="Choose" value={value.state} onChange={pick('state')} />
      </Field>
      <Field label="LGA" htmlFor={id('lga')}>
        <SelectInput id={id('lga')} options={lgas} placeholder={loading ? 'Loading…' : 'Choose'} value={value.lga} onChange={pick('lga')} disabled={!value.state || loading} />
      </Field>
      <Field label="Ward" htmlFor={id('ward')}>
        <SelectInput id={id('ward')} options={wards} placeholder="Choose" value={value.ward} onChange={pick('ward')} disabled={!value.lga} />
      </Field>
      <Field label="Polling unit" htmlFor={id('unit')} hint="As printed on your voter's card.">
        {pollingUnits.length > SEARCH_FROM_UNITS && <div className="mb-2"><SearchInput value={query} onChange={setQuery} placeholder="Search units in this ward" /></div>}
        <SelectInput id={id('unit')} options={units} placeholder="Choose" value={value.code} onChange={pick('code')} disabled={!value.ward} />
      </Field>
    </>
  )
}
