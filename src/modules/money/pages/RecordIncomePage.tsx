import { Check } from 'lucide-react'

import { ActionBar } from '@/components/layout/ActionBar'
import { Button } from '@/components/shared'
import { IncomeFields } from '../components/IncomeFields'
import { useRecordIncome } from '../hooks/use-record-income'

export function RecordIncomePage() {
  const { form, submit, isSaving } = useRecordIncome()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Record income</h1>
      <form className="mt-5" onSubmit={submit} noValidate>
        <IncomeFields form={form} />
        <ActionBar>
          <Button type="submit" variant="primary" size="lg" block icon={Check} disabled={isSaving}>{isSaving ? 'Saving…' : 'Save'}</Button>
        </ActionBar>
      </form>
    </div>
  )
}
