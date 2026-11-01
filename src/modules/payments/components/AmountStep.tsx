import { AmountInput, Field, SelectInput } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { formatAmountInput, parseAmount } from '../utils/amount'
import type { ActivityOption, PayDraft } from '../types'
import { QuickAmounts } from './QuickAmounts'

interface AmountStepProps {
  draft: PayDraft
  activities: ActivityOption[]
  onChange: (changes: Partial<PayDraft>) => void
}

function activityOptions(activities: ActivityOption[]) {
  return activities.map((activity) => ({ value: activity.id, label: `${activity.title} · ${formatDay(activity.date)}` }))
}

export function AmountStep({ draft, activities, onChange }: AmountStepProps) {
  return (
    <>
      <h1 className="h1">Amount</h1>
      <div className="mt-5"><AmountInput value={formatAmountInput(draft.amount)} onChange={(event) => onChange({ amount: parseAmount(event.target.value) })} /></div>
      <div className="mt-3"><QuickAmounts value={draft.amount} onPick={(amount) => onChange({ amount })} /></div>
      <Field label="Link activity" htmlFor="pay-activity" optional className="mt-6">
        <SelectInput id="pay-activity" placeholder="None" options={activityOptions(activities)} value={draft.activityId ?? ''} onChange={(event) => onChange({ activityId: event.target.value || undefined })} />
      </Field>
    </>
  )
}
