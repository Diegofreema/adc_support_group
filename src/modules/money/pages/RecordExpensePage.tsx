import { Check } from 'lucide-react'

import { ActionBar } from '@/components/layout/ActionBar'
import { Button } from '@/components/shared'
import { ExpenseFields } from '../components/ExpenseFields'
import { useRecordExpense } from '../hooks/use-record-expense'

export function RecordExpensePage() {
  const { form, submit, isSaving } = useRecordExpense()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Record expense</h1>
      <form className="mt-5" onSubmit={submit} noValidate>
        <ExpenseFields form={form} />
        <ActionBar>
          <Button type="submit" variant="primary" size="lg" block icon={Check} disabled={isSaving}>{isSaving ? 'Saving…' : 'Save'}</Button>
        </ActionBar>
      </form>
    </div>
  )
}
