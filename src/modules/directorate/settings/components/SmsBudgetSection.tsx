import { Save } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Banner, Button, Card, CardHead, Field, StatGrid, TextInput } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { SmsBudgetWarning } from '../../shared/components/SmsBudgetWarning'
import type { SmsBudget } from '../../shared/services/admin-settings'
import { useSmsBudget } from '../hooks/use-settings'

function BudgetForm({ current, onSave, busy }: { current: number; onSave: (value: number) => void; busy: boolean }) {
  const [value, setValue] = useState(String(current))
  const amount = Number(value)
  const valid = value.trim() !== '' && Number.isInteger(amount) && amount >= 0
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (valid) onSave(amount)
  }
  return (
    <form className="mt-4" onSubmit={submit} noValidate>
      <Field label="Monthly budget (SMS)" htmlFor="sms-budget" error={valid ? undefined : 'Enter 0 or more'}>
        <div className="row">
          <TextInput id="sms-budget" className="grow" inputMode="numeric" value={value} onChange={(event) => setValue(event.target.value)} />
          <Button type="submit" variant="primary" icon={Save} disabled={!valid || busy || amount === current}>Save</Button>
        </div>
      </Field>
    </form>
  )
}

function budgetStats(budget: SmsBudget) {
  return [
    { label: 'Monthly budget', value: formatNumber(budget.monthlyBudget) },
    { label: 'Used this month', value: formatNumber(budget.usedThisMonth) },
    { label: 'Left', value: formatNumber(budget.left) },
  ]
}

/** SMS for important messages to people without email; paid by the Directorate. */
export function SmsBudgetSection() {
  const { budget, canEdit, save } = useSmsBudget()
  if (!budget) return <Banner tone="info">The SMS budget is not available yet.</Banner>
  return (
    <>
      <SmsBudgetWarning className="mb-4" />
      <Card>
        <CardHead title="SMS budget" />
        <p className="faint small mb-3">Important messages (added to a group, verified, rejected, handovers, reminders) go by email, or by SMS from this budget when someone has no email.</p>
        <StatGrid stats={budgetStats(budget)} columns={3} />
        {canEdit
          ? <BudgetForm key={budget.monthlyBudget} current={budget.monthlyBudget} onSave={(value) => save.mutate(value)} busy={save.isPending} />
          : <p className="faint small mt-4">Only a super admin can change the budget.</p>}
      </Card>
    </>
  )
}
