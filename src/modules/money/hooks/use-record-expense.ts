import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRequiredUser } from '@/stores/session-store'
import { recordExpense } from '../services/record.service'
import type { ExpenseCategory } from '../types'
import { parseAmount, today } from '../utils/amount'
import { expenseSchema, type ExpenseForm } from '../utils/schemas'
import { useMoneyMutation } from './use-money-mutation'

/** "Record expense": amount, date, what for, receipt. */
export function useRecordExpense() {
  const user = useRequiredUser()
  const save = useMoneyMutation(recordExpense, 'Expense recorded')
  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { amount: '', occurredOn: today(), category: '', description: '' },
  })
  const onValid = (values: ExpenseForm) =>
    save.mutate({
      groupId: user.activeGroupId ?? '',
      amount: parseAmount(values.amount),
      occurredOn: values.occurredOn,
      category: values.category as ExpenseCategory,
      description: values.description,
      receipt: values.receipt,
    })
  return { form, submit: form.handleSubmit(onValid), isSaving: save.isPending }
}
