import { SelectInput } from '@/components/shared'
import { PERIOD_OPTIONS } from '../../shared/constants/options'
import type { Period } from '../types'

export function PeriodSelect({ value, onChange }: { value: Period; onChange: (value: Period) => void }) {
  return (
    <SelectInput small aria-label="Period" options={PERIOD_OPTIONS} value={value} onChange={(event) => onChange(event.target.value as Period)} />
  )
}
