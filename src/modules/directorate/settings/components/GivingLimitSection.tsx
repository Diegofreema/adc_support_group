import { Save } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { AmountInput, Button, Card, CardHead, Field } from '@/components/shared'
import { formatNaira, formatNumber } from '@/lib/format'
import { useGivingLimit } from '../hooks/use-settings'

/** "250,000" → 250000; "" → null (no limit). */
function parseLimit(input: string): number | null {
  const digits = input.replace(/\D/g, '')
  return digits ? Number(digits) : null
}

const formatLimit = (limit: number | null) => (limit === null ? '' : formatNumber(limit))

function LimitForm({ current, onSave, busy }: { current: number | null; onSave: (limit: number | null) => void; busy: boolean }) {
  const [value, setValue] = useState(formatLimit(current))
  const limit = parseLimit(value)
  const valid = limit === null || limit > 0
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (valid) onSave(limit)
  }
  return (
    <form className="mt-4" onSubmit={submit} noValidate>
      <Field label="Yearly limit per person" htmlFor="giving-limit" optional error={valid ? undefined : 'Enter more than ₦0, or leave it empty'}>
        <AmountInput id="giving-limit" placeholder="No limit" value={value} onChange={(event) => setValue(formatLimit(parseLimit(event.target.value)))} />
      </Field>
      <Button type="submit" variant="primary" icon={Save} className="mt-3" disabled={!valid || busy || limit === current}>Save</Button>
    </form>
  )
}

/** The yearly campaign giving limit: going past it warns the payer and flags the payment. It never blocks. */
export function GivingLimitSection() {
  const { limit, isLoading, canEdit, save } = useGivingLimit()
  if (isLoading) return null
  return (
    <Card>
      <CardHead title="Giving limit" />
      <p className="faint small mb-3">Each person's paid giving to causes and purposes in a calendar year counts. Dues don't. Going past the limit warns the payer and shows the payment under Payments, Over the limit. It never stops a payment.</p>
      <div className="bold">{limit === null ? 'No limit' : `${formatNaira(limit)} a year`}</div>
      {canEdit
        ? <LimitForm key={limit ?? 'none'} current={limit} onSave={(value) => save.mutate(value)} busy={save.isPending} />
        : <p className="faint small mt-4">Only a super admin can change the limit.</p>}
    </Card>
  )
}
