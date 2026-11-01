import { Field, SelectInput } from '@/components/shared'
import { CATEGORY_OPTIONS, PERIOD_OPTIONS, STATE_OPTIONS } from '../../shared/constants/options'
import type { ExportBuilder } from '../hooks/use-exports'

/** Narrow the export down. */
export function ExportFilters({ builder }: { builder: ExportBuilder }) {
  const { spec, update } = builder
  return (
    <div className="grid-2 mt-4">
      <Field label="State" htmlFor="x-state"><SelectInput id="x-state" options={STATE_OPTIONS} value={spec.state} onChange={(event) => update('state')(event.target.value)} /></Field>
      <Field label="Category" htmlFor="x-cat" className="!mt-0"><SelectInput id="x-cat" options={CATEGORY_OPTIONS} value={spec.category} onChange={(event) => update('category')(event.target.value)} /></Field>
      <Field label="Period" htmlFor="x-period" className="!mt-0"><SelectInput id="x-period" options={PERIOD_OPTIONS} value={spec.period} onChange={(event) => update('period')(event.target.value)} /></Field>
    </div>
  )
}
